import type { CallbackFn } from "../type-helpers/global-type-helpers";
import { isArray, isObject } from "../type-helpers/typeof";

type DebouncedFnParams<TParams> =
	| TParams[]
	| [params: TParams | TParams[], overrideOptions: { $delay: number }];

/**
 * Creates a debounced function that delays invoking `callbackFn` until after `delay` milliseconds have elapsed
 * since the last time the debounced function was invoked. The function has options to handle maximum wait time.
 * It can be configured to override the delay dynamically when called.
 *
 * @param callbackFn - The function to debounce.
 * @param delay - The number of milliseconds to delay.
 * @param options - Optional settings like maxWait
 *
 * @returns the new debounced function.
 */

const debounce = <TParams>(
	callbackFn: CallbackFn<TParams>,
	delay: number | undefined,
	options: { maxWait?: number } = {}
) => {
	let timeoutId: number | null;
	let maxWaitTimeoutId: number | null;

	const $clearMainTimeout = (): void => void (timeoutId && window.clearTimeout(timeoutId));

	function debouncedFn(...params: TParams[]): void;
	function debouncedFn(params: TParams | TParams[], overrideOptions: { $delay: number }): void;

	function debouncedFn(...params: DebouncedFnParams<TParams>) {
		const overrideOptions = isObject(params[1]) && "$delay" in params[1] ? params[1] : null;

		const resolvedParams = overrideOptions ? params[0] : params;

		$clearMainTimeout();

		timeoutId = window.setTimeout(() => {
			isArray(resolvedParams)
				? callbackFn(...(resolvedParams as TParams[]))
				: callbackFn(resolvedParams);

			timeoutId = null;
		}, overrideOptions?.$delay ?? delay);

		if (!options.maxWait) return;

		// == Only register a new maxWaitTimeout if it's timeoutId is set to null, which implies the previous one has been executed
		if (maxWaitTimeoutId !== null) return;

		maxWaitTimeoutId = window.setTimeout(() => {
			// == Cancel the main timeout before invoking callbackFn
			$clearMainTimeout();

			isArray(resolvedParams)
				? callbackFn(...(resolvedParams as TParams[]))
				: callbackFn(resolvedParams);

			maxWaitTimeoutId = null;
		}, options.maxWait);
	}

	debouncedFn.cancel = $clearMainTimeout;
	// prettier-ignore
	debouncedFn.cancelMaxWait = (): void => void (maxWaitTimeoutId && window.clearTimeout(maxWaitTimeoutId));

	return debouncedFn;
};

export { debounce };
