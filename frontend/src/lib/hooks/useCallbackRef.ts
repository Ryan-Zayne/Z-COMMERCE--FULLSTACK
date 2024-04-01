import { useCallback, useLayoutEffect, useRef } from "react";
import type { CallbackFn } from "../type-helpers/global-type-helpers";

function useCallbackRef<TParams, TResult>(
	callbackFn: CallbackFn<TParams, TResult>
): (...params: TParams[]) => TResult;

function useCallbackRef<TParams, TResult>(
	callbackFn: CallbackFn<TParams, TResult> | undefined
): (...params: TParams[]) => TResult | undefined;

function useCallbackRef<TParams, TResult>(callbackFn: CallbackFn<TParams, TResult> | undefined) {
	const callbackRef = useRef(callbackFn);

	useLayoutEffect(() => {
		callbackRef.current = callbackFn; // == Doing this instead updating it during render cuz according to Dan Abramov, render should be pure
	}, [callbackFn]);

	const savedCallback = useCallback((...params: TParams[]) => callbackRef.current?.(...params), []);

	return savedCallback;
}

export { useCallbackRef };
