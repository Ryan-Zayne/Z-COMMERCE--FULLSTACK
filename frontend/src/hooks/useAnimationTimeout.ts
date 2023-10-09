/* eslint-disable consistent-return */
import { useCallback, useEffect, useRef } from 'react';
import { useCallbackRef } from './useCallbackRef';

const useAnimationTimeout = (callbackFn: () => void, delay: number) => {
	const animationFrameId = useRef(0);
	const startTimeStampRef = useRef<number | null>(null);
	const savedCallback = useCallbackRef(callbackFn);

	// prettier-ignore
	const smoothAnimation = useCallback((timeStamp: DOMHighResTimeStamp) => {
		if (startTimeStampRef.current === null) {
			startTimeStampRef.current = timeStamp;
		}

		const elapsedTime = Math.floor(timeStamp - startTimeStampRef.current);

		if (elapsedTime >= delay) {
			savedCallback();
			return;
		}

		animationFrameId.current = requestAnimationFrame(smoothAnimation)

	}, [delay, savedCallback]);

	const onAnimationStart = useCallback(
		() => (animationFrameId.current = requestAnimationFrame(smoothAnimation)),
		[smoothAnimation]
	);

	const onAnimationStop = useCallback(() => cancelAnimationFrame(animationFrameId.current), []);

	useEffect(() => {
		onAnimationStart();

		return () => onAnimationStop();
	}, [onAnimationStart, onAnimationStop]);

	return { animationFrameId: animationFrameId.current, onAnimationStop };
};

export { useAnimationTimeout };
