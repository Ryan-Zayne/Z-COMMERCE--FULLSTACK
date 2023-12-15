import type { ApiResponseData, BaseFetchConfig, FetchConfig } from './create-fetcher.types.ts';
import { HTTPError, getResponseData } from './create-fetcher.utils.ts';

const createFetcher = <TBaseData, TBaseError = { status: 'error'; message: string }>(
	baseConfig: BaseFetchConfig
) => {
	const {
		baseURL,
		method: baseMethod = 'GET',
		timeout: baseTimeout = 6000,
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
			method = baseMethod,
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

		const { requestInterceptor, responseInterceptor, errorInterceptor } = interceptors;

		try {
			const modifiedFetchConfig = (await requestInterceptor?.(restOfFetchConfig)) ?? restOfFetchConfig;

			const response = await fetch(`${baseURL}${url}`, {
				signal: controller.signal,
				method,
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
				// eslint-disable-next-line no-console
				console.error('AbortError', `Request to ${url} timed out after ${timeout}ms`);

				return {
					dataInfo: null,
					errorInfo: {
						status: 'error',
						message: `Request to ${url} timed out after ${timeout}ms`,
					} as TError,
				};
			}

			await errorInterceptor?.(error);

			if (error instanceof TypeError || error instanceof SyntaxError || error instanceof Error) {
				return {
					dataInfo: null,
					errorInfo: {
						status: 'error',
						message: error.message ?? defaultErrorMessage,
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

