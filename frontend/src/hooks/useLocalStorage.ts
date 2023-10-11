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

	// Store current value in state, and attempt to load it from local storage onMount if it exists
	const [storedValue, setStoredValue] = useState<TValue | undefined>(() => {
		if (typeof window === 'undefined') return defaultValue;

		try {
			rawValueRef.current = window.localStorage.getItem(key);
			const initialState = rawValueRef.current ? parser(rawValueRef.current) : defaultValue;

			return initialState;
		} catch (error) {
			logger(error);
			return defaultValue;
		}
	});

	// prettier-ignore
	const dispatchStorageEvent = useCallback((dispatchOptions: StorageEventInit & { eventFn: () => void }) => {
		const { eventFn, key: storedValueKey, ...restOfOptions } = dispatchOptions;

		eventFn();

		window.dispatchEvent(
			new StorageEvent('storage', {
				key: storedValueKey,
				...restOfOptions,
			})
		);
	}, []);

	// Function for updating the local storage item whenever the value changes
	const handleStorageUpdate = useCallback(() => {
		if (typeof window === 'undefined') return;

		const newValue = stringifier(storedValue);
		const oldValue = rawValueRef.current;
		rawValueRef.current = newValue;

		if (storedValue === undefined) {
			// Dispatching the storage event to sync across tabs
			dispatchStorageEvent({
				key,
				eventFn: () => localStorage.removeItem(key),
				storageArea: window.localStorage,
				url: window.location.href,
			});

			return;
		}

		dispatchStorageEvent({
			key,
			eventFn: () => localStorage.setItem(key, newValue),
			newValue,
			oldValue,
			storageArea: window.localStorage,
			url: window.location.href,
		});
	}, [storedValue, key, stringifier, dispatchStorageEvent]);

	const handleRemoveValue = useCallback(() => {
		try {
			localStorage.removeItem(key);
			setStoredValue(undefined);
		} catch {
			// If user is in private mode or has storage restriction localStorage can throw the error.
		}
	}, [key]);

	// prettier-ignore
	const handleStorageSyncAcrossTabs = useCallback((event: StorageEvent) => {
			if (event.key !== key || event.storageArea !== window.localStorage) return;

			try {
				if (event.newValue !== rawValueRef.current) {
					rawValueRef.current = event.newValue;
					const newValue = event.newValue ? parser(event.newValue) : undefined;

					setStoredValue(newValue);
				}
			} catch (error) {
				logger(error);
			}
		},
		[key, logger, parser]
	);

	useEffect(
		function storageUpdateEffect() {
			try {
				handleStorageUpdate();
			} catch (error) {
				logger(error);
			}
		},

		[logger, handleStorageUpdate]
	);

	useEffect(
		function storageSyncEffect() {
			if (!syncData) return;

			window.addEventListener('storage', handleStorageSyncAcrossTabs);

			return () => {
				window.removeEventListener('storage', handleStorageSyncAcrossTabs);
			};
		},

		[syncData, handleStorageSyncAcrossTabs]
	);

	return [storedValue, setStoredValue, handleRemoveValue] as const;
};

export { useLocalStorage };

