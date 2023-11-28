import type { BaseFetchConfig, FetchConfig } from './create-fetcher.types';
import { HttpError } from './create-fetcher.utils.ts';

const createFetcherInstance = <TBaseResponseData>(baseConfig: BaseFetchConfig) => {
	const {
		baseURL,
		method: baseMethod = 'GET',
		timeout: baseTimeout = 10000,
		requestInterceptor: baseRequestInterceptor,
		responseInterceptor: baseResponseInterceptor,
		errorInterceptor: baseErrorInterceptor,
		defaultErrorMessage = 'Failed to fetch data from server!',
		...restOfBaseConfig
	} = baseConfig;

	const abortControllerStore = new Map<`/${string}`, AbortController>();

	const fetcherInstance = async <TResponseData = TBaseResponseData>(
		url: `/${string}`,
		config?: FetchConfig
	) => {
		const {
			method = baseMethod,
			timeout = baseTimeout,
			requestInterceptor = baseRequestInterceptor,
			responseInterceptor = baseResponseInterceptor,
			errorInterceptor = baseErrorInterceptor,
			...restOfFetchConfig
		} = config ?? {};

		const previousController = abortControllerStore.get(url);

		if (previousController) {
			previousController.abort();
		}

		const controller = new AbortController();
		const timeoutId = window.setTimeout(() => controller.abort(), timeout);
		abortControllerStore.set(url, controller);

		try {
			const modifiedFetchConfig = (await requestInterceptor?.(restOfFetchConfig)) ?? restOfFetchConfig;

			const response = await fetch(`${baseURL}${url}`, {
				signal: controller.signal,
				method,
				...restOfBaseConfig,
				...modifiedFetchConfig,
			});

			window.clearTimeout(timeoutId);

			await responseInterceptor?.(response);

			if (!response.ok) {
				throw new HttpError(
					`
					${defaultErrorMessage}
					Status Info: ${response.statusText},
					Status Code: ${response.status}
					`
				);
			}

			return response.json() as TResponseData;

			// Error handling
		} catch (error) {
			if (error instanceof DOMException && error.name === 'AbortError') {
				throw new DOMException(`Request to ${url} timed out after ${timeout}ms`, 'AbortError');
			}

			await errorInterceptor?.(error);

			throw error;

			// Clean up the timeout and remove the now unneeded AbortController from store
		} finally {
			abortControllerStore.delete(url);
			window.clearTimeout(timeoutId);
		}
	};

	return fetcherInstance;
};

export { createFetcherInstance };
