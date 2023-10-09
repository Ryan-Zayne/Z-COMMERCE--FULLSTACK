import { useCallback, useRef } from 'react';
import { useCallbackRef } from './useCallbackRef';

type CallbackType<T, R> = (...values: T[]) => R;

const useThrottleByTimer = <TValues, TResult>(
	callbackFn: CallbackType<TValues, TResult>,
	delay: number
) => {
	const savedCallback = useCallbackRef(callbackFn);
	const startTimeRef = useRef<number | null>(null);

	// prettier-ignore
	const throttledCallback = useCallback((...values: TValues[]) => {
			if (startTimeRef.current === null) {
				startTimeRef.current = Date.now();
			}

			const elapsedTime = Date.now() - startTimeRef.current;
			if (elapsedTime < delay) return;

			savedCallback(...values);
			startTimeRef.current = null;
		},
		[delay, savedCallback]
	);

	return throttledCallback;
};

const useThrottleBySetTimeout = <TValues, TResult>(
	callbackFn: CallbackType<TValues, TResult>,
	delay: number
) => {
	const savedCallback = useCallbackRef(callbackFn);
	const throttleTimeoutId = useRef<NodeJS.Timeout | null>(null);

	// prettier-ignore
	const throttledCallback = useCallback((...values: TValues[]) => {
		if (throttleTimeoutId.current !== null) return;

		throttleTimeoutId.current = setTimeout(() => {
			savedCallback(...values);
			throttleTimeoutId.current = null;
		}, delay);

	}, [delay, savedCallback]);

	return throttledCallback;
};

const useThrottleByFrame = <TValues, TResult>(callbackFn: CallbackType<TValues, TResult>) => {
	const savedCallback = useCallbackRef(callbackFn);

	const throttleRequestId = useRef<number | null>(null);

	// prettier-ignore
	const throttledCallback = useCallback(() => {
		if (throttleRequestId.current !== null) return;

		throttleRequestId.current = requestAnimationFrame(() => {
			savedCallback();
			throttleRequestId.current = null;
		});

	}, [savedCallback]);

	return throttledCallback;
};

export { useThrottleByFrame, useThrottleBySetTimeout, useThrottleByTimer };
