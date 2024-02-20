import { isServer } from "@/lib/utils/constants";
import { parseJSON } from "@/lib/utils/parseJSON";
import { useCallback, useEffect, useRef, useState } from "react";
import { dispatchStorageEvent } from "./dispatchStorageEvent";

type StorageHookOptions<TStorageValue> = {
	syncData?: boolean;
	logger?: (error: unknown) => void;
	parser?: <TValue extends TStorageValue = TStorageValue>(value: string) => TValue | null;
	stringifier?: <TValue extends TStorageValue = TStorageValue>(object: TValue | null) => string;
};

const useLocalStorage = <TStorageValue>(
	key: string,
	defaultValue: TStorageValue | null = null,
	options: StorageHookOptions<TStorageValue> = {}
) => {
	const {
		syncData = true,
		stringifier = JSON.stringify,
		parser = parseJSON,
		// eslint-disable-next-line no-console
		logger = console.log,
	} = options;

	const rawStorageValueRef = useRef<string | null>(null);

	const [storageValue, setStorageValue] = useState<TStorageValue | null>(
		// prettier-ignore
		function readStorageOnMount() {
			if (!isServer) {
				return defaultValue;
			}

			try {
				rawStorageValueRef.current = window.localStorage.getItem(key);

				if (rawStorageValueRef.current === null) {
					return defaultValue;
				}

				const initialStorageValue = parseJSON<TStorageValue>(rawStorageValueRef.current);

				return initialStorageValue;
			} catch (error) {
				logger(error);
				return defaultValue;
			}
		}
	);

	const removeValue = useCallback(
		(storedValueKey: typeof key) => {
			try {
				localStorage.removeItem(storedValueKey);
				setStorageValue(null);
			} catch (error) {
				// If user is in private mode or has storage restriction localStorage can throw the error.
				logger(error);
			}
		},
		[logger]
	);

	useEffect(
		function handleStorageUpdateEffect() {
			if (typeof window === "undefined") return;

			if (storageValue === null) {
				// Dispatching the storage event to sync across tabs
				dispatchStorageEvent({
					eventCallback: () => localStorage.removeItem(key),
					key,
				});

				return;
			}

			const oldValue = rawStorageValueRef.current;
			const newValue = stringifier(storageValue);

			rawStorageValueRef.current = newValue;

			dispatchStorageEvent({
				eventCallback: () => localStorage.setItem(key, newValue),
				key,
				newValue,
				oldValue,
			});
		},

		[key, storageValue, stringifier]
	);

	useEffect(
		function handleStorageSyncEffect() {
			if (!syncData) return;

			const handleStorageSyncAcrossTabs = (event: StorageEvent) => {
				if (event.key !== key || event.storageArea !== window.localStorage) return;

				if (event.newValue === rawStorageValueRef.current) return;

				try {
					rawStorageValueRef.current = event.newValue;
					const newValue = event.newValue ? (parser(event.newValue) as TStorageValue) : null;

					setStorageValue(newValue);
				} catch (error) {
					logger(error);
				}
			};

			window.addEventListener("storage", handleStorageSyncAcrossTabs);

			// eslint-disable-next-line consistent-return
			return () => {
				window.removeEventListener("storage", handleStorageSyncAcrossTabs);
			};
		},

		[syncData, key, parser, logger]
	);

	return [storageValue, setStorageValue, removeValue] as const;
};

export { useLocalStorage };
