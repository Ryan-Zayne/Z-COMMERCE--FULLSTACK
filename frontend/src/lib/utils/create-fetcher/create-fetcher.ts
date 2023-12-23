import type {
	ApiResponseData,
	BaseFetchConfig,
	DefaultErrorType,
	FetchConfig,
} from './create-fetcher.types.ts';
import { HTTPError, getResponseData } from './create-fetcher.utils.ts';

const createFetcher = <TBaseData, TBaseError = DefaultErrorType>(baseConfig: BaseFetchConfig) => {
	const {
		baseURL,
		timeout: baseTimeout = 10000,
		interceptors: baseInterceptors = {},
		defaultErrorMessage = 'Failed to fetch data from server!',
		...restOfBaseConfig
	} = baseConfig;

	const abortControllerStore = new Map<`/${string}`, AbortController>();

	async function fetchApiInstance<TData = TBaseData, TError = TBaseError>(
		url: `/${string}`,
		config?: FetchConfig
	): Promise<ApiResponseData<TData, TError>> {
		const {
			timeout = baseTimeout,
			interceptors = baseInterceptors,
			...restOfFetchConfig
		} = config ?? {};

		const previousController = abortControllerStore.get(url);

		if (previousController) {
			previousController.abort();
		}

		const controller = new AbortController();
		abortControllerStore.set(url, controller);
		const timeoutId = window.setTimeout(() => controller.abort(), timeout);

		try {
			const { requestInterceptor, responseInterceptor } = interceptors;

			const modifiedFetchConfig = (await requestInterceptor?.(restOfFetchConfig)) ?? restOfFetchConfig;

			const response = await fetch(`${baseURL}${url}`, {
				signal: controller.signal,
				method: 'GET',
				...restOfBaseConfig,
				...modifiedFetchConfig,
			});

			await responseInterceptor?.(response);

			if (!response.ok) {
				return {
					dataInfo: null,
					errorInfo: new HTTPError({
						defaultErrorMessage,
						responseData: await getResponseData<TError>(response),
					}) as TError,
				};
			}

			return {
				dataInfo: await getResponseData<TData>(response),
				errorInfo: null,
			};

			// Exhaustive Error handling
		} catch (error) {
			if (error instanceof DOMException && error.name === 'AbortError') {
				return {
					dataInfo: null,
					errorInfo: {
						status: 'error',
						message: `Request timed out after ${timeout}ms`,
					} as TError,
				};
			}

			if (error instanceof TypeError || error instanceof SyntaxError || error instanceof Error) {
				return {
					dataInfo: null,
					errorInfo: {
						status: 'error',
						message: error.message,
					} as TError,
				};
			}

			return {
				dataInfo: null,
				errorInfo: {
					status: 'error',
					message: defaultErrorMessage,
				} as TError,
			};

			// Clean up the timeout and remove the now unneeded AbortController from store
		} finally {
			abortControllerStore.delete(url);
			window.clearTimeout(timeoutId);
		}
	}

	return fetchApiInstance;
};

export { createFetcher };
