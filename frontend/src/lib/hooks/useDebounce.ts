import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useCallbackRef } from ".";
import type { CallbackFn } from "../type-helpers/global-type-helpers";
import { debounce } from "../utils/debounce";

type DebounceOptions = {
	delay: number;
};

export const useDebouncedFn = <TParams>(callBackFn: CallbackFn<TParams>, options: DebounceOptions) => {
	const { delay } = options;

	const savedCallback = useCallbackRef(callBackFn);

	const debouncedFn = useMemo(() => debounce(savedCallback, delay), [delay, savedCallback]);

	return debouncedFn;
};

export const useDebouncedState = <TValue>(defualtValue: TValue, options: DebounceOptions) => {
	const { delay } = options;
	const [value, setValue] = useState(defualtValue);

	const setDebouncedValue = useMemo(
		() => debounce((newValue: React.SetStateAction<TValue>) => setValue(newValue), delay),
		[delay]
	);

	return [value, setDebouncedValue] as const;
};

export const useDebouncedValue = <TValue>(value: TValue, options: DebounceOptions) => {
	const { delay } = options;
	const timeoutRef = useRef<number>();
	const [debouncedValue, setDebouncedValue] = useState(value);

	const cancelTimeout = useCallback(() => window.clearTimeout(timeoutRef.current), []);

	useEffect(() => {
		timeoutRef.current = window.setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return cancelTimeout;
	}, [value, delay, cancelTimeout]);

	return [debouncedValue, cancelTimeout] as const;
};
