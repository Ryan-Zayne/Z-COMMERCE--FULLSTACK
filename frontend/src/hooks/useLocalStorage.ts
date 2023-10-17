/* eslint-disable unicorn/no-useless-undefined */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
import { useCallback, useEffect, useRef, useState } from 'react';

type HookOptions<TOptions> = {
	syncData?: boolean;
	logger?: (error: unknown) => void;
	parser?: (value: string) => TOptions | undefined;
	stringifier?: (object: TOptions | undefined) => string;
};

const dispatchStorageEvent = (dispatchOptions: StorageEventInit & { eventFn: () => void }) => {
	const { eventFn, key: storedValueKey, ...restOfOptions } = dispatchOptions;

	eventFn();

	window.dispatchEvent(
		new StorageEvent('storage', {
			key: storedValueKey,
			...restOfOptions,
		})
	);
};

const useLocalStorage = <TValue>(
	key: string,
	defaultValue?: TValue,
	options: HookOptions<TValue> = {}
) => {
	const {
		stringifier = JSON.stringify,
		parser = JSON.parse,
		logger = console.log,
		syncData = true,
	} = options;

	const rawValueRef = useRef<string | null>(null);

	const readStorageOnMount = useCallback(() => {
		if (typeof window === 'undefined') return defaultValue;

		try {
			rawValueRef.current = window.localStorage.getItem(key);
			const initialState = rawValueRef.current ? parser(rawValueRef.current) : defaultValue;
			return initialState;
		} catch (error) {
			logger(error);
			return defaultValue;
		}
	}, [defaultValue, key, logger, parser]);

	const [storageValue, setStorageValue] = useState<TValue | undefined>(readStorageOnMount);

	const handleStorageUpdate = useCallback(() => {
		if (typeof window === 'undefined') return;

		if (storageValue === undefined) {
			// Dispatching the storage event to sync across tabs
			dispatchStorageEvent({
				eventFn: () => localStorage.removeItem(key),
				key,
				storageArea: window.localStorage,
				url: window.location.href,
			});

			return;
		}

		const newValue = stringifier(storageValue);
		const oldValue = rawValueRef.current;

		rawValueRef.current = newValue;

		dispatchStorageEvent({
			eventFn: () => localStorage.setItem(key, newValue),
			key,
			newValue,
			oldValue,
			storageArea: window.localStorage,
			url: window.location.href,
		});
	}, [storageValue, key, stringifier]);

	// prettier-ignore
	const handleStorageSyncAcrossTabs = useCallback((event: StorageEvent) => {
			if (event.key !== key || event.storageArea !== window.localStorage) return;

			try {
				if (event.newValue !== rawValueRef.current) {
					rawValueRef.current = event.newValue;
					const newValue = event.newValue ? parser(event.newValue) : undefined;

					setStorageValue(newValue);
				}
			} catch (error) {
				logger(error);
			}
		},
		[key, logger, parser]
	);

	const removeValue = useCallback((storedValueKey: typeof key) => {
		try {
			localStorage.removeItem(storedValueKey);
			setStorageValue(undefined);
		} catch {
			// If user is in private mode or has storage restriction localStorage can throw the error.
		}
	}, []);

	useEffect(
		function updateStorageEffect() {
			try {
				handleStorageUpdate();
			} catch (error) {
				logger(error);
			}
		},

		[handleStorageUpdate, logger]
	);

	useEffect(
		function syncStorageEffect() {
			if (!syncData) return;

			window.addEventListener('storage', handleStorageSyncAcrossTabs);

			return () => {
				window.removeEventListener('storage', handleStorageSyncAcrossTabs);
			};
		},

		[syncData, handleStorageSyncAcrossTabs]
	);

	return [storageValue, setStorageValue, removeValue] as const;
};

export { useLocalStorage };
