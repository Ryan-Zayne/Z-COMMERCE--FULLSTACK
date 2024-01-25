import { isObject } from "@/lib/type-helpers/typeof";
import type {
	ApiResponseData,
	BaseFetchConfig,
	DefaultErrorType,
	FetchConfig,
} from "./create-fetcher.types";
import { HTTPError, getResponseData } from "./create-fetcher.utils";

const createFetcher = <TBaseData, TBaseError = DefaultErrorType>(baseConfig: BaseFetchConfig) => {
	const {
		baseURL,
		timeout: baseTimeout,
		interceptors: baseInterceptors = {},
		defaultErrorMessage = "Failed to fetch data from server!",
		...restOfBaseConfig
	} = baseConfig;

	const abortControllerStore = new Map<`/${string}`, AbortController>();

	const fetchWrapper = async <TData = TBaseData, TError = TBaseError>(
		url: `/${string}`,
		config?: FetchConfig
	): Promise<ApiResponseData<TData, TError>> => {
		const {
			timeout = baseTimeout,
			body,
			interceptors = baseInterceptors,
			...restOfFetchConfig
		} = config ?? {};

		const previousController = abortControllerStore.get(url);

		if (previousController) {
			previousController.abort();
		}

		const controller = new AbortController();
		abortControllerStore.set(url, controller);

		const timeoutId = timeout && window.setTimeout(() => controller.abort(), timeout);

		try {
			const { onRequest, onResponse, onResponseError } = interceptors;

			await onRequest?.(restOfFetchConfig);

			const response = await fetch(`${baseURL}${url}`, {
				signal: controller.signal,

				method: "GET", // Setting default method as GET

				body: isObject(body) ? JSON.stringify(body) : body,

				headers: isObject(body)
					? {
							"Content-Type": "application/json",
							Accept: "application/json",
						}
					: undefined,

				...restOfBaseConfig,
				...restOfFetchConfig,
			});

			if (!response.ok) {
				await onResponseError?.(response);

				return {
					dataInfo: null,
					errorInfo: new HTTPError({
						response: await getResponseData<TError>(response),
						defaultErrorMessage,
					}) as TError,
				};
			}

			await onResponse?.(response);

			return {
				dataInfo: await getResponseData<TData>(response),
				errorInfo: null,
			};

			// Exhaustive Error handling
		} catch (error) {
			if (error instanceof DOMException && error.name === "AbortError") {
				return {
					dataInfo: null,
					errorInfo: {
						status: "error",
						message: `Request timed out after ${timeout}ms`,
					} as TError,
				};
			}

			const { onRequestError } = interceptors;

			await onRequestError?.(restOfFetchConfig);

			if (error instanceof TypeError || error instanceof SyntaxError || error instanceof Error) {
				return {
					dataInfo: null,
					errorInfo: {
						status: "error",
						message: error.message,
					} as TError,
				};
			}

			return {
				dataInfo: null,
				errorInfo: {
					status: "error",
					message: defaultErrorMessage,
				} as TError,
			};

			// Clean up the timeout and remove the now unneeded AbortController from store
		} finally {
			abortControllerStore.delete(url);
			timeoutId && window.clearTimeout(timeoutId);
		}
	};

	return fetchWrapper;
};

export { createFetcher };
