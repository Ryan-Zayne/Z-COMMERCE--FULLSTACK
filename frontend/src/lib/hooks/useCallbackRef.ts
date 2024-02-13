import { useCallback, useRef } from "react";
import type { CallbackFn } from "../type-helpers/global-type-helpers";

const useCallbackRef = <TParams, TResult>(callbackFn: CallbackFn<TParams, TResult> | undefined) => {
	const callbackRef = useRef(callbackFn);

	if (callbackRef.current !== callbackFn) {
		callbackRef.current = callbackFn; // Updating callbackRef during render instead of inside an effect
	}

	const savedCallback = useCallback((...params: TParams[]) => callbackRef.current?.(...params), []);

	return savedCallback;
};

export { useCallbackRef };
