import { useState } from "react";
import { debounce } from "../core/debounce";
import type { CallbackFn } from "../type-helpers/global-type-helpers";
import { useUnmountEffect } from "./effect-wrappers/useUnmountEffect";
import { useCallbackRef } from "./useCallbackRef";
import { useConstant } from "./useConstant";

export const useDebouncedFn = <TParams>(callBackFn: CallbackFn<TParams>, delay: number | undefined) => {
	const latestCallback = useCallbackRef(callBackFn);

	const debouncedFn = useConstant(() => debounce(latestCallback, delay));

	useUnmountEffect(() => debouncedFn.cancel());

	return debouncedFn;
};

export const useDebouncedState = <TValue>(defaultValue: TValue, delay: number | undefined) => {
	const [value, setValue] = useState(defaultValue);

	const setDebouncedValue = useConstant(() => debounce(setValue, delay));

	useUnmountEffect(() => setDebouncedValue.cancel());

	return [value, setDebouncedValue, setValue] as const;
};
