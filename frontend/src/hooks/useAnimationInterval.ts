/* eslint-disable consistent-return */
import { assertDefined } from '@/lib/global-type-helpers';
import { useCallback, useEffect, useRef } from 'react';
import { useCallbackRef } from './useCallbackRef';

type AnimationOptionsType = {
	callbackFn: () => void;
	intervalDuration: number | null;
};

const useAnimationInterval = (options: AnimationOptionsType) => {
	const { callbackFn, intervalDuration } = options;

	const startTimeStampRef = useRef<number | null>(null);
	const animationFrameId = useRef(0);

	const savedCallback = useCallbackRef(callbackFn);

	// prettier-ignore
	const smoothAnimation = useCallback((timeStamp: DOMHighResTimeStamp) => {
			if (startTimeStampRef.current === null) {
				startTimeStampRef.current = Math.floor(timeStamp);
			}

			const elapsedTime = Math.floor(timeStamp - startTimeStampRef.current);

			if (elapsedTime >= assertDefined(intervalDuration)) {
				savedCallback();
				startTimeStampRef.current = null;
			}

			animationFrameId.current = requestAnimationFrame(smoothAnimation);
		},
		[intervalDuration, savedCallback]
	);

	const onAnimationStart = useCallback(
		() => (animationFrameId.current = requestAnimationFrame(smoothAnimation)),
		[smoothAnimation]
	);

	const onAnimationStop = useCallback(() => cancelAnimationFrame(animationFrameId.current), []);

	useEffect(
		function toggleAnimationByIntervalEffect() {
			if (intervalDuration === null) return;

			onAnimationStart();
			return () => onAnimationStop();
		},

		[intervalDuration, onAnimationStart, onAnimationStop]
	);

	return { animationFrameId: animationFrameId.current, onAnimationStop };
};

export { useAnimationInterval };
