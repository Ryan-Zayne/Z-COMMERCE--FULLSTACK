/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef } from 'react';

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

	useEffect(() => {
		callbackRef.current = callbackFn;
	}, [callbackFn]);

	const savedCallback = useCallback(
		(...savedParams: TParams[]) => callbackRef.current(...savedParams),
		[]
	);

	return savedCallback;
};

export { useCallbackRef };
