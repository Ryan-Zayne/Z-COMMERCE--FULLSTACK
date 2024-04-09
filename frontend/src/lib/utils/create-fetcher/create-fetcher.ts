import { isObject } from "@/lib/type-helpers/typeof";
import type {
	ApiResponseData,
	BaseFetchConfig,
	FetchConfig,
	PossibleErrorType,
} from "./create-fetcher.types";
import { getResponseData } from "./create-fetcher.utils";

const createFetcher = <TBaseData, TBaseError = PossibleErrorType>(baseConfig: BaseFetchConfig) => {
	const {
		baseURL,
		timeout: baseTimeout,
		interceptors: baseInterceptors = {},
		defaultErrorMessage = "Failed to fetch data from server!",
		...restOfBaseConfig
	} = baseConfig;

	const abortControllerStore = new Map<`/${string}`, AbortController>();

	const callApi = async <TData = TBaseData, TError = TBaseError>(
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
			await interceptors.onRequest?.(restOfFetchConfig);

			const response = await fetch(`${baseURL}${url}`, {
				signal: controller.signal,

				method: "GET",

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
				await interceptors.onResponseError?.(response);

				const errorResponse = await getResponseData<TError>(response);

				return {
					dataInfo: null,
					errorInfo: {
						errorName: "HTTPError",
						response: errorResponse,
						message: (errorResponse as PossibleErrorType).message ?? defaultErrorMessage,
					},
				};
			}

			await interceptors.onResponse?.(response);

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
						errorName: "AbortError",
						message: `Request timed out after ${timeout}ms`,
					},
				};
			}

			await interceptors.onRequestError?.(restOfFetchConfig);

			return {
				dataInfo: null,
				errorInfo: {
					errorName: (error as PossibleErrorType).name ?? "UnknownError",
					message: (error as PossibleErrorType).message ?? defaultErrorMessage,
				},
			};

			// Clean up the timeout and remove the now unneeded AbortController from store
		} finally {
			abortControllerStore.delete(url);
			timeoutId && window.clearTimeout(timeoutId);
		}
	};

	return callApi;
};

export { createFetcher };
