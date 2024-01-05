import { useCallback, useRef, useState } from "react";

type DebounceOptions = {
	delay: number;
};

export const useDebouncedFn = <TParams>(
	callBackFn: (...params: TParams[]) => void,
	options: DebounceOptions
) => {
	const { delay } = options;

	const timeoutRef = useRef<number | null>(null);

	const debouncedFn = (...params: TParams[]) => {
		timeoutRef.current && clearTimeout(timeoutRef.current);

		timeoutRef.current = window.setTimeout(() => {
			callBackFn(...params);
			timeoutRef.current = null;
		}, delay);
	};

	return useCallback(debouncedFn, [callBackFn, delay]);
};

export const useDebouncedValue = <TValue>(value: TValue, options: DebounceOptions) => {
	const { delay } = options;
	const [debouncedValue, setDebouncedValue] = useState(value);
	const timeoutRef = useRef<number | null>(null);

	if (debouncedValue === value) {
		return value;
	}

	timeoutRef.current && clearTimeout(timeoutRef.current);

	timeoutRef.current = window.setTimeout(() => {
		setDebouncedValue(value);
		timeoutRef.current = null;
	}, delay);

	return debouncedValue;
};
