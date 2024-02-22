import { useCallback, useRef } from "react";
import type { CallbackFn } from "../type-helpers/global-type-helpers";
import { useIsoMorpicEffect } from "./useIsoMorphicEffect";

const useCallbackRef = <TParams, TResult>(callbackFn: CallbackFn<TParams, TResult> | undefined) => {
	const callbackRef = useRef(callbackFn);

	useIsoMorpicEffect(() => {
		callbackRef.current = callbackFn; // Doing this instead updating it during render cuz according to Dan Abramov, render should be pure
	}, [callbackFn]);

	const savedCallback = useCallback((...params: TParams[]) => callbackRef.current?.(...params), []);

	return savedCallback;
};

export { useCallbackRef };
