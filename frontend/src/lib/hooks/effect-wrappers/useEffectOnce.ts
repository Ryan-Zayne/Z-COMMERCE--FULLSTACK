import { useEffect } from "react";
import { useCallbackRef } from "..";

const useEffectOnce = (callBackFn: React.EffectCallback) => {
	const savedCallback = useCallbackRef(callBackFn);

	// == savedCallback is always stable so no worries about re-execution of this effect
	useEffect(savedCallback, [savedCallback]);
};

export default useEffectOnce;
