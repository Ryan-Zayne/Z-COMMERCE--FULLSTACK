import { useState } from "react";
import type { CallbackFn } from "../type-helpers/global-type-helpers";
import { debounce } from "../core/debounce";
import { useUnmountEffect } from "./effect-wrappers/useUnmountEffect";
import { useCallbackRef } from "./useCallbackRef";
import { useConstant } from "./useConstant";

export const useDebouncedFn = <TParams>(callBackFn: CallbackFn<TParams>, delay: number | undefined) => {
	const latestCallback = useCallbackRef(callBackFn);

	const debouncedFn = useConstant(() => debounce(latestCallback, delay));

	useUnmountEffect(() => debouncedFn.cancelTimeout());

	return debouncedFn;
};

export const useDebouncedState = <TValue>(defaultValue: TValue, delay: number | undefined) => {
	const [value, setValue] = useState(defaultValue);

	const setDebouncedValue = useConstant(() => debounce(setValue, delay));

	useUnmountEffect(() => setDebouncedValue.cancelTimeout());

	return [value, setDebouncedValue, setValue] as const;
};
