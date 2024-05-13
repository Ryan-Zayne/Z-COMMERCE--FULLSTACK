import type { CallbackFn } from "../type-helpers/global-type-helpers";
import { isObject } from "../type-helpers/typeof";

const debounce = <TParams>(
	callbackFn: CallbackFn<TParams>,
	delay: number | undefined,
	options: { maxWait?: number } = {}
) => {
	let timeoutId: number | null;
	let maxWaitTimeoutId: number | null;

	const $clearMainTimeout = (): void => void (timeoutId && window.clearTimeout(timeoutId));

	type DebouncedFn = {
		(...params: TParams[]): void;
		(overrideOptions: { $delay: number }, ...params: TParams[]): void;
		cancel: () => void;
	};

	const debouncedFn: DebouncedFn = (...params) => {
		$clearMainTimeout();

		const overrideOptions = isObject(params[0]) && "$delay" in params[0] ? params[0] : null;

		const resolvedParams = (overrideOptions ? params.slice(1) : params) as TParams[];

		timeoutId = window.setTimeout(() => {
			callbackFn(...resolvedParams);
			timeoutId = null;
		}, overrideOptions?.$delay ?? delay);

		// == If maxWaitTimerId is not equal to null, it means the previous maxWait timeout has not been called yet, so dont register another one
		if (!options.maxWait || maxWaitTimeoutId !== null) return;

		maxWaitTimeoutId = window.setTimeout(() => {
			// == Cancel the main timeout before invoking callback
			$clearMainTimeout();

			callbackFn(...resolvedParams);
			maxWaitTimeoutId = null;
		}, options.maxWait);
	};

	debouncedFn.cancel = $clearMainTimeout;

	return debouncedFn;
};

export { debounce };
