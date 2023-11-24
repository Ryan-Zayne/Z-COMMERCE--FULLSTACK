import { useCallback, useRef } from 'react';
import { useAfterMountEffect } from './useAfterMountEffect.ts';
import { useCallbackRef } from './useCallbackRef.ts';

const useThrottleByTimer = <V, R>(callbackFn: (...values: V[]) => R, delay: number) => {
	const savedCallback = useCallbackRef(callbackFn);
	const startTimeRef = useRef<number | null>(null);

	// prettier-ignore
	const throttledCallback = useCallback((...values: V[]) => {
		if (startTimeRef.current === null) {
			startTimeRef.current = Date.now();
		}

		const elapsedTime = Date.now() - startTimeRef.current;

		if (elapsedTime < delay) return;

		savedCallback(...values);
		startTimeRef.current = null;

	}, [delay, savedCallback]);

	return throttledCallback;
};

const useThrottleBySetTimeout = <V, R>(callbackFn: (...values: V[]) => R, delay: number) => {
	const savedCallback = useCallbackRef(callbackFn);
	const throttleTimeoutId = useRef<number | null>(null);

	// prettier-ignore
	const throttledCallback = useCallback((...values: V[]) => {
		if (throttleTimeoutId.current !== null) return;

		throttleTimeoutId.current = window.setTimeout(() => {
			savedCallback(...values);

			throttleTimeoutId.current = null;
		}, delay);

	}, [delay, savedCallback]);

	useAfterMountEffect(() => {
		return () => clearTimeout(throttleTimeoutId.current as number);
	}, []);

	return throttledCallback;
};

const useThrottleByFrame = <V, R>(callbackFn: (...values: V[]) => R) => {
	const savedCallback = useCallbackRef(callbackFn);

	const throttleFrameId = useRef<number | null>(null);

	// prettier-ignore
	const throttledCallback = useCallback((...values: V[]) => {
		if (throttleFrameId.current !== null) return;

		throttleFrameId.current = requestAnimationFrame(() => {
			savedCallback(...values);
			throttleFrameId.current = null;
		});

	}, [savedCallback]);

	return throttledCallback;
};

export { useThrottleByFrame, useThrottleBySetTimeout, useThrottleByTimer };
