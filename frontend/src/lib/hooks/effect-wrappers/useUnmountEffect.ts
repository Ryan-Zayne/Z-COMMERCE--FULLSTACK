import { useCallbackRef } from "../useCallbackRef";
import useEffectOnce from "./useEffectOnce";

const useOnUnmountEffect = (cleanUpFn: () => void) => {
	const savedCleanUp = useCallbackRef(cleanUpFn);

	useEffectOnce(() => savedCleanUp);
};

export { useOnUnmountEffect };
