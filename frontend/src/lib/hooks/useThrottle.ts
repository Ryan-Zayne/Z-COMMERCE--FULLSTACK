import type { CallbackFn } from "../type-helpers/global-type-helpers";
import { throttleByFrame, throttleBySetTimeout, throttleByTimer } from "../utils/throttle";
import { useUnmountEffect } from "./effect-wrappers/useUnmountEffect";
import { useCallbackRef } from "./useCallbackRef";
import { useInitialize } from "./useInitialize";

export const useThrottleBySetTimeout = <TParams>(callbackFn: CallbackFn<TParams>, delay: number) => {
	const latestCallback = useCallbackRef(callbackFn);

	const throttledCallback = useInitialize(() => throttleBySetTimeout(latestCallback, delay));

	useUnmountEffect(() => throttledCallback.cancelTimeout());

	return throttledCallback;
};

export const useThrottleByTimer = <TParams>(callbackFn: CallbackFn<TParams>, delay: number) => {
	const latestCallback = useCallbackRef(callbackFn);

	const throttledCallback = useInitialize(() => throttleByTimer(latestCallback, delay));

	return throttledCallback;
};

export const useThrottleByFrame = <TParams>(callbackFn: CallbackFn<TParams>) => {
	const latestCallback = useCallbackRef(callbackFn);

	const throttledCallback = useInitialize(() => throttleByFrame(latestCallback));

	useUnmountEffect(() => throttledCallback.cancelAnimation());

	return throttledCallback;
};
