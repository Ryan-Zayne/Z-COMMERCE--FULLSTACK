import { useCallback, useRef } from 'react';
import { useAfterMountEffect } from './useAfterMountEffect';
import { useCallbackRef } from './useCallbackRef';

const useThrottleByTimer = <V, R>(callbackFn: (...values: V[]) => R, delay: number) => {
	const savedCallback = useCallbackRef(callbackFn);
	const startTimeRef = useRef<number | null>(null);

	// prettier-ignore
	const throttledCallback = useCallback((...values: V[]) => {
		if (startTimeRef.current === null) {
			startTimeRef.current = Date.now();
		}

		const elapsedTime = Date.now() - startTimeRef.current;

		if (elapsedTime >= delay) {
			savedCallback(...values);
			startTimeRef.current = null;
		}

	}, [delay, savedCallback]);

	return throttledCallback;
};

const useThrottleBySetTimeout = <V, R>(callbackFn: (...values: V[]) => R, delay: number) => {
	const savedCallback = useCallbackRef(callbackFn);
	const throttleTimeoutId = useRef<NodeJS.Timeout | null>(null);

	// prettier-ignore
	const throttledCallback = useCallback((...values: V[]) => {
		if (throttleTimeoutId.current !== null) return;

		throttleTimeoutId.current = setTimeout(() => {
			savedCallback(...values);
			throttleTimeoutId.current = null;
		}, delay);

	}, [delay, savedCallback]);

	useAfterMountEffect(() => {
		clearTimeout(throttleTimeoutId.current as NodeJS.Timeout);
	}, []);

	return throttledCallback;
};

const useThrottleByFrame = <V, R>(callbackFn: (...values: V[]) => R) => {
	const savedCallback = useCallbackRef(callbackFn);

	const throttleFrameId = useRef<number | null>(null);

	// prettier-ignore
	const throttledCallback = useCallback(() => {
		if (throttleFrameId.current !== null) return;

		throttleFrameId.current = requestAnimationFrame(() => {
			savedCallback();
			throttleFrameId.current = null;
		});

	}, [savedCallback]);

	return throttledCallback;
};

export { useThrottleByFrame, useThrottleBySetTimeout, useThrottleByTimer };
