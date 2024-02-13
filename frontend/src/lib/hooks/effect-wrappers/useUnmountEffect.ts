import { useCallbackRef } from "../useCallbackRef";
import useEffectOnce from "./useEffectOnce";

const useUnmountEffect = (cleanUpFn: () => void) => {
	const savedCleanUp = useCallbackRef(cleanUpFn);

	useEffectOnce(() => savedCleanUp);
};

export { useUnmountEffect };
