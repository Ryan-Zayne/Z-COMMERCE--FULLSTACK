/* eslint-disable consistent-return */
import { assertDefined } from '@/lib/global-type-helpers';
import { useCallback, useEffect, useRef } from 'react';
import { useCallbackRef } from './useCallbackRef';

type AnimationOptionsType = {
	callbackFn: () => void;
	delay: number | null;
};

const useAnimationTimeout = (options: AnimationOptionsType) => {
	const { callbackFn, delay = 5000 } = options;

	const animationFrameId = useRef(0);
	const startTimeStampRef = useRef<number | null>(null);
	const savedCallback = useCallbackRef(callbackFn);

	// prettier-ignore
	const smoothAnimation = useCallback((timeStamp: DOMHighResTimeStamp) => {
		if (startTimeStampRef.current === null) {
			startTimeStampRef.current = timeStamp;
		}

		const elapsedTime = Math.floor(timeStamp - startTimeStampRef.current);

		if (elapsedTime >= assertDefined(delay)) {
			savedCallback();
			return;
		}

		animationFrameId.current = requestAnimationFrame(smoothAnimation);
	},
		[delay, savedCallback]
	);

	const onAnimationStart = useCallback(
		() => (animationFrameId.current = requestAnimationFrame(smoothAnimation)),
		[smoothAnimation]
	);

	const onAnimationStop = useCallback(() => cancelAnimationFrame(animationFrameId.current), []);

	// This effect allows start and stop of the animation from the consumer component just by toggling the interval between a number and null
	useEffect(() => {
		if (delay !== null) {
			onAnimationStart();

			return () => onAnimationStop();
		}
	}, [delay, onAnimationStart, onAnimationStop]);

	return { animationFrameId: animationFrameId.current, onAnimationStop };
};

export { useAnimationTimeout };
