import { useCallback, useLayoutEffect, useRef } from 'react';

/**
 * This is a custom hook that returns a memoized version of the callback function.
 *
 *  1. The ref stores the refrence to the callback function.
 *  2. If the callback reference changes, the ref updates its value to the new callback.
 *  3. The hook then returns the memoized version of the callback function for referential stability.

 * @param callbackFn The callback function to memoize.
 * @param deps The dependency list for the useCallback hook.
 * @returns The memoized callback function.
 */

const useCallbackRef = <TParams, TResult>(callbackFn: (...params: TParams[]) => TResult) => {
	const callbackRef = useRef(callbackFn);

	useLayoutEffect(() => {
		callbackRef.current = callbackFn;
	}, [callbackFn]);

	const savedCallback = useCallback((...params: TParams[]) => callbackRef.current(...params), []);

	return savedCallback;
};

export { useCallbackRef };
