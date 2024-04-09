import { useState } from "react";
import type { CallbackFn } from "../type-helpers/global-type-helpers";
import { debounce } from "../utils/debounce";
import { useUnmountEffect } from "./effect-wrappers/useUnmountEffect";
import { useCallbackRef } from "./useCallbackRef";
import { useInitialize } from "./useInitialize";

export const useDebouncedFn = <TParams>(callBackFn: CallbackFn<TParams>, delay: number | undefined) => {
	const latestCallback = useCallbackRef(callBackFn);

	const debouncedFn = useInitialize(() => debounce(latestCallback, delay));

	useUnmountEffect(() => debouncedFn.cancelTimeout());

	return debouncedFn;
};

export const useDebouncedState = <TValue>(defaultValue: TValue, delay: number | undefined) => {
	const [value, setValue] = useState(defaultValue);

	const setDebouncedValue = useInitialize(() =>
		debounce((newValue: TValue) => setValue(newValue), delay)
	);

	useUnmountEffect(() => setDebouncedValue.cancelTimeout());

	return [value, setDebouncedValue] as const;
};
