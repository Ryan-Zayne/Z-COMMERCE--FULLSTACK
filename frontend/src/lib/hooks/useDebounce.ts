import { useCallback, useEffect, useRef, useState } from 'react';
import { useCallbackRef } from './useCallbackRef.ts';

type DebounceOptions = {
	delay: number;
};

export const useDebouncedFn = <TParams>(
	callBackFn: (...params: TParams[]) => void,
	options: DebounceOptions
) => {
	const { delay } = options;

	const timeoutRef = useRef<number | null>(null);

	const stableCallbackFn = useCallbackRef(callBackFn);

	// prettier-ignore
	const debouncedFn = useCallback((...params: TParams[]) => {
			if (timeoutRef.current !== null) {
				clearTimeout(timeoutRef.current);
			}

			timeoutRef.current = window.setTimeout(() => {
				stableCallbackFn(...params);
				timeoutRef.current = null;
			}, delay);
		},
		[delay, stableCallbackFn]
	);

	return debouncedFn;
};

export const useDebouncedValue = <TValue>(value: TValue, options: DebounceOptions) => {
	const { delay } = options;
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const timeoutId = window.setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(timeoutId);
		};
	}, [value, delay]);

	return debouncedValue;
};
