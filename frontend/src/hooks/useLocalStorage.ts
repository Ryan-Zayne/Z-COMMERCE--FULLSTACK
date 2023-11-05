import { useCallback, useEffect, useRef, useState } from 'react';

type StorageHookOptions<TValue> = {
	syncData?: boolean;
	logger?: (error: unknown) => void;
	parser?: (value: string) => TValue | undefined;
	stringifier?: (object: TValue | undefined) => string;
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
	options: StorageHookOptions<TValue> = {}
) => {
	const {
		syncData = true,
		stringifier = JSON.stringify,
		parser = JSON.parse,
		// eslint-disable-next-line no-console
		logger = console.log,
	} = options;

	const rawStorageValueRef = useRef<string | null>(null);

	const [storageValue, setStorageValue] = useState<TValue | null>(function readStorageOnMount() {
		if (typeof window === 'undefined') {
			return defaultValue;
		}

		try {
			rawStorageValueRef.current = window.localStorage.getItem(key);

			const initialStorageValue = rawStorageValueRef.current
				? parser(rawStorageValueRef.current)
				: defaultValue;

			return initialStorageValue;
		} catch (error) {
			logger(error);
			return defaultValue;
		}
	});

	const removeValue = useCallback((storedValueKey: typeof key) => {
		try {
			localStorage.removeItem(storedValueKey);
			setStorageValue(null);
		} catch {
			// If user is in private mode or has storage restriction localStorage can throw the error.
		}
	}, []);

	useEffect(
		function handleStorageUpdateEffect() {
			if (typeof window === 'undefined') return;

			if (storageValue === null) {
				// Dispatching the storage event to sync across tabs
				dispatchStorageEvent({
					eventFn: () => localStorage.removeItem(key),
					key,
					storageArea: window.localStorage,
					url: window.location.href,
				});

				return;
			}

			const oldValue = rawStorageValueRef.current;
			const newValue = stringifier(storageValue);

			rawStorageValueRef.current = newValue;

			dispatchStorageEvent({
				eventFn: () => localStorage.setItem(key, newValue),
				key,
				newValue,
				oldValue,
				storageArea: window.localStorage,
				url: window.location.href,
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
					const newValue = event.newValue ? parser(event.newValue) : undefined;

					setStorageValue(newValue);
				} catch (error) {
					logger(error);
				}
			};

			window.addEventListener('storage', handleStorageSyncAcrossTabs);

			// eslint-disable-next-line consistent-return
			return () => {
				window.removeEventListener('storage', handleStorageSyncAcrossTabs);
			};
		},

		[syncData, key, parser, logger]
	);

	return [storageValue, setStorageValue, removeValue] as const;
};

export { useLocalStorage };
