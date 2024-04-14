import type { CallbackFn } from "../type-helpers/global-type-helpers";

const debounce = <TParams>(
	callbackFn: CallbackFn<TParams>,
	delay: number | undefined,
	options?: { maxWait?: number }
) => {
	let timeoutId: number | null;
	let maxWaitTimeoutId: number | null;

	const { maxWait } = options ?? {};

	const cancelMainTimeout = () => {
		timeoutId && window.clearTimeout(timeoutId);
	};

	const debouncedFn = (...params: TParams[]) => {
		cancelMainTimeout();

		timeoutId = window.setTimeout(() => {
			callbackFn(...params);
			timeoutId = null;
		}, delay);

		// == If maxWaitTimerId is not null, it means the maxWait timer is yet to be called, so dont register another one
		if (!maxWait || maxWaitTimeoutId !== null) return;

		maxWaitTimeoutId = window.setTimeout(() => {
			// == Cancel the main timeout before invoking callback
			cancelMainTimeout();

			callbackFn(...params);
			maxWaitTimeoutId = null;
		}, maxWait);
	};

	debouncedFn.cancelTimeout = cancelMainTimeout;

	return debouncedFn;
};

export { debounce };
