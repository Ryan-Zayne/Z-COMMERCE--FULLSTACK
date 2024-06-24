import { throttleByFrame, throttleBySetTimeout, throttleByTimer } from "../core/throttle";
import type { CallbackFn } from "../type-helpers/global-type-helpers";
import { useOnUnmountEffect } from "./effect-wrappers/useUnmountEffect";
import { useCallbackRef } from "./useCallbackRef";
import { useConstant } from "./useConstant";

export const useThrottleBySetTimeout = <TParams>(callbackFn: CallbackFn<TParams>, delay: number) => {
	const latestCallback = useCallbackRef(callbackFn);

	const throttledCallback = useConstant(() => throttleBySetTimeout(latestCallback, delay));

	useOnUnmountEffect(() => throttledCallback.cancelTimeout());

	return throttledCallback;
};

export const useThrottleByTimer = <TParams>(callbackFn: CallbackFn<TParams>, delay: number) => {
	const latestCallback = useCallbackRef(callbackFn);

	const throttledCallback = useConstant(() => throttleByTimer(latestCallback, delay));

	return throttledCallback;
};

export const useThrottleByFrame = <TParams>(callbackFn: CallbackFn<TParams>) => {
	const latestCallback = useCallbackRef(callbackFn);

	const throttledCallback = useConstant(() => throttleByFrame(latestCallback));

	useOnUnmountEffect(() => throttledCallback.cancelAnimation());

	return throttledCallback;
};
