import { isObject } from "@/lib/type-helpers/typeof";
import type {
	AbegErrorResponse,
	AbegSuccessResponse,
	BaseRequestConfig,
	CallAbegApiResult,
} from "./create-fetcher.types";
import { getResponseData } from "./create-fetcher.utils";

const createFetcher = <TBaseData, TBaseError>(baseConfig: BaseRequestConfig) => {
	const {
		baseURL,
		timeout,
		defaultErrorMessage = "Failed to fetch success response from server!",
		onResponse,
		onResponseError,
		...restOfBaseConfig
	} = baseConfig;

	const abortControllerStore = new Map<`/${string}`, AbortController>();

	let controller: AbortController;

	const callApi = async <TData = TBaseData, TError = TBaseError>(
		url: `/${string}`,
		bodyData?: Record<string, unknown> | FormData,
		signal?: AbortSignal
	): CallAbegApiResult<TData, TError> => {
		const prevController = abortControllerStore.get(url);

		if (prevController) {
			prevController.abort();
		}

		controller = new AbortController();
		abortControllerStore.set(url, controller);

		const timeoutId =
			typeof timeout === "number"
				? setTimeout(() => {
						controller.abort();
						throw new Error(`Request timed out after ${timeout}ms`, {
							cause: "Timeout",
						});
					}, timeout)
				: null;

		try {
			const response = await fetch(`${baseURL}${url}`, {
				signal: signal ?? controller.signal,
				method: bodyData ? "POST" : "GET",

				body: isObject(bodyData) ? JSON.stringify(bodyData) : bodyData,

				headers: isObject(bodyData)
					? {
							"content-type": "application/json",
							accept: "application/json",
						}
					: undefined,

				...restOfBaseConfig,
			});

			// == Response has http errors
			if (!response.ok) {
				const errorResponse = await getResponseData<AbegErrorResponse<TError>>(response);

				await onResponseError?.({ ...response, response: errorResponse });

				return {
					data: null,
					error: errorResponse,
				};
			}

			// == Response was successful
			await onResponse?.(response);

			return {
				data: await getResponseData<AbegSuccessResponse<TData>>(response),
				error: null,
			};

			// == Exhaustive error handling for request failures
		} catch (error) {
			if (error instanceof DOMException && error.name === "AbortError" && error.cause === "Timeout") {
				console.info(
					`%cAbortError: ${error.message}`,
					"color: red; font-weight: 500; font-size: 14px;"
				);

				return {
					data: null,
					error: {
						status: "Error",
						message: error.message,
					},
				};
			}

			return {
				data: null,
				error: {
					status: "Error",
					message: (error as { message?: string }).message ?? defaultErrorMessage,
				},
			};

			// == Clean up the timeout and remove the now unneeded AbortController from store
		} finally {
			abortControllerStore.delete(url);
			timeoutId !== null && clearTimeout(timeoutId);
		}
	};

	callApi.abort = () => {
		controller.abort();
	};

	return callApi;
};

export { createFetcher };
