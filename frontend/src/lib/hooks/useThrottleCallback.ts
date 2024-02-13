import { useCallback, useRef } from "react";
import type { CallbackFn } from "../type-helpers/global-type-helpers";
import { useUnmountEffect } from "./effect-wrappers/useUnmountEffect";
import { useCallbackRef } from "./useCallbackRef";

const useThrottleByTimer = <TParams, TResult>(callbackFn: CallbackFn<TParams, TResult>, delay: number) => {
	const startTimeRef = useRef<number | null>(null);
	const savedCallback = useCallbackRef(callbackFn);

	const throttledCallback = useCallback(
		(...values: TParams[]) => {
			if (startTimeRef.current === null) {
				startTimeRef.current = Date.now();
			}

			const elapsedTime = Date.now() - startTimeRef.current;

			if (elapsedTime >= delay) {
				savedCallback(...values);
				startTimeRef.current = null;
			}
		},
		[delay, savedCallback]
	);

	return throttledCallback;
};

const useThrottleBySetTimeout = <TParams, TResult>(
	callbackFn: CallbackFn<TParams, TResult>,
	delay: number
) => {
	const timeoutId = useRef<number | null>(null);
	const savedCallback = useCallbackRef(callbackFn);

	const throttledCallback = useCallback(
		(...values: TParams[]) => {
			if (timeoutId.current !== null) return;

			timeoutId.current = window.setTimeout(() => {
				savedCallback(...values);
				timeoutId.current = null;
			}, delay);
		},
		[delay, savedCallback]
	);

	useUnmountEffect(() => timeoutId.current && clearTimeout(timeoutId.current));

	return throttledCallback;
};

const useThrottleByFrame = <TParams, TResult>(callbackFn: CallbackFn<TParams, TResult>) => {
	const animationFrameId = useRef<number | null>(null);
	const savedCallback = useCallbackRef(callbackFn);

	const throttledCallback = useCallback(
		(...values: TParams[]) => {
			if (animationFrameId.current !== null) return;

			animationFrameId.current = requestAnimationFrame(() => {
				savedCallback(...values);
				animationFrameId.current = null;
			});
		},
		[savedCallback]
	);

	return throttledCallback;
};

export { useThrottleByFrame, useThrottleBySetTimeout, useThrottleByTimer };
