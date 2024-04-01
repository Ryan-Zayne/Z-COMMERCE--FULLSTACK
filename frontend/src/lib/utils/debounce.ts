import type { CallbackFn } from "../type-helpers/global-type-helpers";

const debounce = <TParams>(callBackFn: CallbackFn<TParams>, delay: number | undefined) => {
	let timeoutId: number | null = null;

	const debouncedFn = (...params: TParams[]) => {
		timeoutId && window.clearTimeout(timeoutId);

		timeoutId = window.setTimeout(() => {
			callBackFn(...params);
			timeoutId = null;
		}, delay);
	};

	debouncedFn.cancelTimeout = () => {
		timeoutId && window.clearTimeout(timeoutId);
	};

	return debouncedFn;
};

export { debounce };
