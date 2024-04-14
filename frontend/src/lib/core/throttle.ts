import type { CallbackFn } from "../type-helpers/global-type-helpers";

export const throttleBySetTimeout = <TParams>(callbackFn: CallbackFn<TParams>, delay: number) => {
	let timeoutId: number | null = null;

	const throttledCallback = (...params: TParams[]) => {
		if (timeoutId !== null) return;

		timeoutId = window.setTimeout(() => {
			callbackFn(...params);
			timeoutId = null;
		}, delay);
	};

	throttledCallback.cancelTimeout = () => {
		timeoutId && clearTimeout(timeoutId);
	};

	return throttledCallback;
};

export const throttleByTimer = <TParams>(callbackFn: CallbackFn<TParams>, delay: number) => {
	let lastCallTime = 0;

	const throttledCallback = (...params: TParams[]) => {
		const elapsedTime = Date.now() - lastCallTime;

		if (elapsedTime >= delay) {
			callbackFn(...params);
			lastCallTime = Date.now();
		}
	};

	return throttledCallback;
};

export const throttleByFrame = <TParams>(callbackFn: CallbackFn<TParams>) => {
	let animationFrameId: number | null = null;

	const throttledCallback = (...params: TParams[]) => {
		if (animationFrameId !== null) return;

		animationFrameId = requestAnimationFrame(() => {
			callbackFn(...params);
			animationFrameId = null;
		});
	};

	throttledCallback.cancelAnimation = () => {
		animationFrameId && cancelAnimationFrame(animationFrameId);
	};

	return throttledCallback;
};
