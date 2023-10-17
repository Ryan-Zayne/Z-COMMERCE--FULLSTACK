/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef } from 'react';

/**
 * This is a custom hook that returns a memoized version of the callback function.
 *
 *  1. The callback reference is stored in a ref to allow it to be updated.
 *  2. If the callback reference changes, the ref is updated to the new callback.
 *  3. Then the up-to-date callback reference is memoized for stable reference and returned.

 * @param callbackFn The callback function to memoize.
 * @param deps The dependency list for the useCallback hook.
 * @returns The memoized callback function.
 */

const useCallbackRef = <TParams, TResult>(
	callbackFn: (...params: TParams[]) => TResult,
	deps?: React.DependencyList
) => {
	const callbackRef = useRef(callbackFn);

	useEffect(() => {
		callbackRef.current = callbackFn;
	}, [callbackFn]);

	const savedCallback = useCallback(callbackRef.current, deps ?? []);

	return savedCallback;
};

export { useCallbackRef };
