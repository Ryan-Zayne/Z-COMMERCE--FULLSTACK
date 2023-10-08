/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef } from 'react';

/**
 * Custom hook that returns a memoized version of the callback function.
 * The callback function is saved in a ref to persist across renders.
 * If the callback function changes, the ref is updated.

 * @param callbackFn The callback function to memoize.
 * @param deps The dependency list for the useCallback hook.
 * @returns The memoized callback function.
 */

const useCallbackRef = <TValues, TResult>(
	callbackFn: (...values: TValues[]) => TResult,
	deps: React.DependencyList = []
) => {
	const callbackRef = useRef(callbackFn);

	useEffect(() => {
		callbackRef.current = callbackFn;
	}, [callbackFn]);

	const savedCallback = useCallback(
		(...savedValues: TValues[]) => callbackRef.current(...savedValues),
		deps
	);

	return savedCallback;
};

export { useCallbackRef };
