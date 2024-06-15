import { useCallbackRef } from "@/lib/hooks/useCallbackRef";
import { useEffect } from "react";
import { setAnimationInterval } from "../core/setAnimationInterval";
import { useConstant } from "./useConstant";

type AnimationOptions = {
	onAnimation: () => void;
	intervalDuration: number | null;
};

const useAnimationInterval = (options: AnimationOptions) => {
	const { onAnimation, intervalDuration } = options;

	const latestCallback = useCallbackRef(onAnimation);

	// prettier-ignore
	const { start, stop } = useConstant(() => setAnimationInterval(latestCallback, intervalDuration));

	useEffect(() => {
		if (intervalDuration === null) return;

		start();

		return stop;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [intervalDuration]);

	return { start, stop };
};

export { useAnimationInterval };
