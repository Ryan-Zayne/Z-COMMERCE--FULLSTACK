import { useCallbackRef } from "../useCallbackRef";
import useEffectOnce from "./useEffectOnce";

const useMountEffect = (callBackFn: () => void) => {
	const savedCallback = useCallbackRef(callBackFn);

	useEffectOnce(() => {
		savedCallback();
	});
};

export { useMountEffect };
