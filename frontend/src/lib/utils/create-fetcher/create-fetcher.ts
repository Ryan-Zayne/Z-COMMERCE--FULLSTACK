import { isObject } from "@/lib/type-helpers/typeof";
import type {
	ApiResponseData,
	BaseFetchConfig,
	FetchConfig,
	PossibleErrorType,
} from "./create-fetcher.types";
import { getResponseData } from "./create-fetcher.utils";

const createFetcher = <TBaseData, TBaseError = PossibleErrorType>(
	baseConfig: BaseFetchConfig<TBaseData, TBaseError>
) => {
	const {
		baseURL,
		timeout: baseTimeout,
		interceptors: baseInterceptors = {},
		signal: baseSignal,
		retries: baseRetries = 0,
		defaultErrorMessage = "Failed to fetch data from server!",
		...restOfBaseConfig
	} = baseConfig;

	const abortControllerStore = new Map<`/${string}`, AbortController>();
	let latestController: AbortController;

	const callApi = async <TData = TBaseData, TError = TBaseError>(
		url: `/${string}`,
		config?: FetchConfig<TData, TError>
	): Promise<ApiResponseData<TData, TError>> => {
		const {
			timeout = baseTimeout,
			body,
			signal = baseSignal,
			interceptors = baseInterceptors as FetchConfig<TData, TError>["interceptors"],
			retries = baseRetries,
			...restOfFetchConfig
		} = config ?? {};

		const previousController = abortControllerStore.get(url);

		if (previousController) {
			previousController.abort();
		}

		latestController = new AbortController();
		abortControllerStore.set(url, latestController);

		const timeoutId = timeout && window.setTimeout(() => latestController.abort(), timeout);

		try {
			await interceptors?.onRequest?.(restOfFetchConfig);

			const response = await fetch(`${baseURL}${url}`, {
				signal: signal ?? latestController.signal,

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

			if (!response.ok && retries > 0) {
				return await callApi(url, { ...config, retries: retries - 1 });
			}

			if (!response.ok) {
				const errorResponse = await getResponseData<TError>(response);

				await interceptors?.onResponseError?.({ ...response, response: errorResponse as TError });

				return {
					dataInfo: null,
					errorInfo: {
						errorName: "HTTPError",
						response: errorResponse,
						message: (errorResponse as PossibleErrorType).message ?? defaultErrorMessage,
					},
				};
			}

			const successResponse = await getResponseData<TData>(response);

			await interceptors?.onResponse?.({ ...response, response: successResponse });

			return {
				dataInfo: successResponse,
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

			await interceptors?.onRequestError?.(restOfFetchConfig);

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

	callApi.abort = () => latestController.abort();

	return callApi;
};

export { createFetcher };
