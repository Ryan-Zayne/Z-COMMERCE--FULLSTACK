import { useCallbackRef } from "@/lib/hooks/useCallbackRef";
import { useEffect } from "react";
import { setAnimationInterval } from "../core/setAnimationInterval";
import { useConstant } from "./useConstant";

type AnimationOptions = {
	callbackFn: () => void;
	intervalDuration: number | null;
};

const useAnimationInterval = (options: AnimationOptions) => {
	const { callbackFn, intervalDuration } = options;

	const latestCallback = useCallbackRef(callbackFn);

	const { onAnimationStart, onAnimationStop } = useConstant(() =>
		setAnimationInterval(latestCallback, intervalDuration)
	);

	useEffect(() => {
		if (intervalDuration === null) return;

		onAnimationStart();

		return onAnimationStop;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [intervalDuration]);

	return { onAnimationStart, onAnimationStop };
};

export { useAnimationInterval };
