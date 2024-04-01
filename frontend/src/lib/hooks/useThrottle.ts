import { useState } from "react";
import type { CallbackFn } from "../type-helpers/global-type-helpers";
import { throttleByFrame, throttleBySetTimeout, throttleByTimer } from "../utils/throttle";
import { useUnmountEffect } from "./effect-wrappers/useUnmountEffect";
import { useCallbackRef } from "./useCallbackRef";

export const useThrottleBySetTimeout = <TParams>(callbackFn: CallbackFn<TParams>, delay: number) => {
	const latestCallback = useCallbackRef(callbackFn);

	const [throttledCallback] = useState(() => throttleBySetTimeout(latestCallback, delay));

	useUnmountEffect(() => throttledCallback.cancelTimeout());

	return throttledCallback;
};

export const useThrottleByTimer = <TParams>(callbackFn: CallbackFn<TParams>, delay: number) => {
	const latestCallback = useCallbackRef(callbackFn);

	const [throttledCallback] = useState(() => throttleByTimer(latestCallback, delay));

	return throttledCallback;
};

export const useThrottleByFrame = <TParams>(callbackFn: CallbackFn<TParams>) => {
	const latestCallback = useCallbackRef(callbackFn);

	const [throttledCallback] = useState(() => throttleByFrame(latestCallback));

	useUnmountEffect(() => throttledCallback.cancelAnimation());

	return throttledCallback;
};
