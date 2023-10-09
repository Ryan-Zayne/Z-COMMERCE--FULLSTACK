/* eslint-disable unicorn/no-useless-undefined */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
import { useCallback, useEffect, useRef, useState } from 'react';

type Options<TOptions> = {
	syncData?: boolean;
	logger?: (error: unknown) => void;
	parser?: (value: string) => TOptions | undefined;
	stringifier?: (object: TOptions | undefined) => string;
};

const useLocalStorage = <TValue>(key: string, defaultValue?: TValue, options: Options<TValue> = {}) => {
	const {
		stringifier = JSON.stringify,
		parser = JSON.parse,
		logger = console.log,
		syncData = true,
	} = options;

	// Use a ref to store the raw value from local storage, as well as to track the previous value when syncing across tabs
	const rawValueRef = useRef<string | null>(null);

	// Use state to store the current value, and attempt to load it from local storage if it exists
	const [value, setValue] = useState<TValue | undefined>(() => {
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
	const dispatchStorageEvent = useCallback((dispatchOptions: StorageEventInit) => {
		const { newValue, oldValue, storageArea, url, ...restOfOptions } = dispatchOptions;

		window.dispatchEvent(
			new StorageEvent('storage', { key, newValue, oldValue, storageArea, url, ...restOfOptions })
		);
	}, [key]);

	// Function for updating the local storage item whenever the value changes
	const handleStorageUpdate = useCallback(() => {
		if (typeof window === 'undefined') return;

		const newValue = stringifier(value);
		const oldValue = rawValueRef.current;
		rawValueRef.current = newValue;

		if (value === undefined) {
			window.localStorage.removeItem(key);
			// Dispatching the storage event to sync across tabs
			dispatchStorageEvent({
				key,
				storageArea: window.localStorage,
				url: window.location.href,
			});

			return;
		}

		window.localStorage.setItem(key, newValue);

		dispatchStorageEvent({
			key,
			newValue,
			oldValue,
			storageArea: window.localStorage,
			url: window.location.href,
		});
	}, [value, key, stringifier, dispatchStorageEvent]);

	// prettier-ignore
	// Function for handling storage events and syncing across tabs
	const handleStorageSyncAcrossTabs = useCallback((event: StorageEvent) => {
			if (event.key !== key || event.storageArea !== window.localStorage) return;

			try {
				if (event.newValue !== rawValueRef.current) {
					rawValueRef.current = event.newValue;
					const newValue = event.newValue ? parser(event.newValue) : undefined;

					setValue(newValue);
				}
			} catch (error) {
				logger(error);
			}
		},
		[key, logger, parser]
	);

	useEffect(() => {
		try {
			handleStorageUpdate();
		} catch (error) {
			logger(error);
		}
	}, [logger, handleStorageUpdate]);

	useEffect(() => {
		if (!syncData) return;

		window.addEventListener('storage', handleStorageSyncAcrossTabs);

		return () => {
			window.removeEventListener('storage', handleStorageSyncAcrossTabs);
		};
	}, [syncData, handleStorageSyncAcrossTabs]);

	const removeValue = useCallback(() => {
		try {
			window.localStorage.removeItem(key);
			setValue(undefined);
		} catch {
			// If user is in private mode or has storage restriction localStorage can throw the error.
		}
	}, [key]);

	return [value, setValue, removeValue] as const;
};

export { useLocalStorage };
