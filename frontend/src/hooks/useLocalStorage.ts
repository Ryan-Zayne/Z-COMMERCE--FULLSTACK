/* eslint-disable unicorn/no-useless-undefined */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type Options<TOptions> = {
	syncData?: boolean;
	logger?: (error: unknown) => void;
	parser?: (value: string) => TOptions | undefined;
	stringifier?: (object: TOptions | undefined) => string;
};

const useLocalStorage = <T>(key: string, defaultValue?: T, options?: Options<T>) => {
	// For custom serializer, logger, parser and syncData value
	const defaultOptions = useMemo(
		() => ({
			stringifier: JSON.stringify,
			parser: JSON.parse,
			logger: console.log,
			syncData: true,
			...options,
		}),
		[options]
	);

	const { stringifier, parser, logger, syncData } = defaultOptions;

	// Use a ref to store the raw value from local storage, as well as to track the previous value when syncing across tabs
	const rawValueRef = useRef<string | null>(null);

	// Use state to store the current value, and attempt to load it from local storage if it exists
	const [value, setValue] = useState<T | undefined>(() => {
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

	// Function for updating the local storage item whenever the value changes
	const updateLocalStorage = useCallback(() => {
		if (typeof window === 'undefined') return;

		const newValue = stringifier(value);
		const oldValue = rawValueRef.current;
		rawValueRef.current = newValue;

		if (value === undefined) {
			window.localStorage.removeItem(key);

			// Dispatching the storage event to sync across tabs
			window.dispatchEvent(
				new StorageEvent('storage', {
					storageArea: window.localStorage,
					url: window.location.href,
					key,
				})
			);
			return;
		}

		window.localStorage.setItem(key, newValue);

		window.dispatchEvent(
			new StorageEvent('storage', {
				storageArea: window.localStorage,
				url: window.location.href,
				key,
				newValue,
				oldValue,
			})
		);
	}, [key, value, stringifier]);

	// Function for handling storage events and syncing across tabs
	const handleStorageChange = useCallback(
		(event: StorageEvent) => {
			if (event.key !== key || event.storageArea !== window.localStorage) return;

			try {
				if (event.newValue !== rawValueRef.current) {
					rawValueRef.current = event.newValue;
					setValue(event.newValue ? parser(event.newValue) : undefined);
				}
			} catch (error) {
				logger(error);
			}
		},
		[key, logger, parser]
	);

	const removeValue = useCallback(() => {
		try {
			window.localStorage.removeItem(key);

			setValue(undefined);
		} catch {
			// If user is in private mode or has storage restriction localStorage can throw the error.
		}
	}, [key]);

	useEffect(() => {
		try {
			updateLocalStorage();
		} catch (error) {
			logger(error);
		}
	}, [logger, updateLocalStorage]);

	useEffect(() => {
		if (!syncData) return;

		window.addEventListener('storage', handleStorageChange);

		return () => {
			window.removeEventListener('storage', handleStorageChange);
		};
	}, [syncData, handleStorageChange]);

	return [value, setValue, removeValue] as const;
};

export { useLocalStorage };
