import { useCallback, useEffect, useRef } from "react";

const useCallbackRef = <TParams, TResult>(callbackFn: (...params: TParams[]) => TResult) => {
	const callbackRef = useRef(callbackFn);

	useEffect(() => {
		callbackRef.current = callbackFn;
	}, [callbackFn]);

	const savedCallback = useCallback((...params: TParams[]) => callbackRef.current(...params), []);

	return savedCallback;
};

export { useCallbackRef };
