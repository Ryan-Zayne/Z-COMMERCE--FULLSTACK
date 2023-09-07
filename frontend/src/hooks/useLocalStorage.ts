/* eslint-disable consistent-return */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type Options<TOptions> = {
	syncData?: boolean;
	logger?: (error: unknown) => void;
	parser?: (value: string) => TOptions | undefined;
	stringifier?: (object: TOptions | undefined) => string;
};

type Setter<TSetter> = React.Dispatch<React.SetStateAction<TSetter | undefined>>;

/**
 * Custom hook for reading and writing to local storage
 */

const useLocalStorage = <T>(key: string, defaultValue?: T, options?: Options<T>) => {
	//* For custom serializer, logger, parser and syncData value
	const defaultOptions = useMemo(
		() => ({
			stringifier: JSON.stringify,
			parser: JSON.parse,
			// eslint-disable-next-line no-console
			logger: console.log,
			syncData: true,
			...options,
		}),
		[options]
	);

	const { stringifier, parser, logger, syncData } = defaultOptions;

	//* Use a ref to store the raw value from local storage, as well as to track the previous value when syncing across tabs
	const rawValueRef = useRef<string | null>(null);

	//* Use state to store the current value, and attempt to load it from local storage if it exists
	const [value, setValue] = useState(() => {
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

	useEffect(() => {
		//* Function for updating the local storage item whenever the value changes

		const updateLocalStorage = () => {
			if (typeof window === 'undefined') return;

			if (value !== undefined) {
				const newValue = stringifier(value);
				const oldValue = rawValueRef.current;
				rawValueRef.current = newValue;

				//* Set the local storage item and dispatch a storage event to sync across tabs
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
			} else {
				//* If the value is undefined, remove the local storage item and dispatch
				//* a storage event to sync across tabs
				window.localStorage.removeItem(key);
				window.dispatchEvent(
					new StorageEvent('storage', {
						storageArea: window.localStorage,
						url: window.location.href,
						key,
					})
				);
			}
		};
		try {
			updateLocalStorage();
		} catch (error) {
			logger(error);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [key, value]);

	useEffect(() => {
		if (!syncData) return;

		//* Function for handling storage events and syncing across tabs
		const handleStorageChange = (event: StorageEvent) => {
			if (event.key !== key || event.storageArea !== window.localStorage) return;

			try {
				if (event.newValue !== rawValueRef.current) {
					rawValueRef.current = event.newValue;
					setValue(event.newValue ? parser(event.newValue) : undefined);
				}
			} catch (error) {
				logger(error);
			}
		};

		window.addEventListener('storage', handleStorageChange);
		return () => {
			window.removeEventListener('storage', handleStorageChange);
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [key, syncData]);

	const removeValue = useCallback(() => {
		try {
			window.localStorage.removeItem(key);
			// eslint-disable-next-line unicorn/no-useless-undefined
			setValue(undefined);
		} catch {
			// If user is in private mode or has storage restriction localStorage can throw the error.
		}
	}, [key]);

	return [value as T, setValue as Setter<T>, removeValue] as const;
};

export { useLocalStorage };
