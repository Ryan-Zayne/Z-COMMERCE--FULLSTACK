import { isObject } from "@/lib/type-helpers/typeof";
import { omitKeys } from "@/lib/utils/omitKeys";
import { pickKeys } from "@/lib/utils/pickKeys";
import { wait } from "@/lib/utils/wait";
import type {
	AbortSignalWithAny,
	BaseConfig,
	FetchConfig,
	GetCallApiResult,
	PossibleErrorType,
} from "./create-fetcher.types";
import {
	HTTPError,
	createRawCallApi,
	defaultOptions,
	fetchSpecficKeys,
	getResponseData,
	isHTTPError,
	isHTTPErrorInstance,
} from "./create-fetcher.utils";

const createFetcher = <TBaseData, TBaseError, TBaseShouldThrow extends boolean = false>(
	baseConfig: BaseConfig<TBaseData, TBaseError, TBaseShouldThrow> = {}
) => {
	const {
		method: baseMethod = "GET",
		body: baseBody,
		headers: baseHeaders,
		signal: baseSignal,
		...restOfBaseFetchConfig
	} = pickKeys(baseConfig, fetchSpecficKeys);

	const baseExtraOptions = omitKeys(baseConfig, fetchSpecficKeys);
	const abortControllerStore = new Map<`/${string}`, AbortController>();

	const callApi = async <
		TData = TBaseData,
		TError = TBaseError,
		TShouldThrow extends boolean = TBaseShouldThrow,
	>(
		url: `/${string}`,
		config: FetchConfig<TData, TError, TShouldThrow> = {}
	): Promise<GetCallApiResult<TData, TError, TShouldThrow>> => {
		type CallApiResult = GetCallApiResult<TData, TError, TShouldThrow>;

		const {
			method = baseMethod,
			body = baseBody,
			headers,
			signal = baseSignal,
			...restOfFetchConfig
		} = pickKeys(config, fetchSpecficKeys);

		const extraOptions = omitKeys(config, fetchSpecficKeys);

		const options = {
			...defaultOptions,
			...baseExtraOptions,
			...extraOptions,
		};

		const prevFetchController = abortControllerStore.get(url);

		if (prevFetchController) {
			const reason = new DOMException("Cancelled the previous unfinished request", "AbortError");
			prevFetchController.abort(reason);
		}

		const fetchController = new AbortController();
		abortControllerStore.set(url, fetchController);

		const timeoutSignal = options.timeout ? AbortSignal.timeout(options.timeout) : null;

		const combinedSignal = (AbortSignal as AbortSignalWithAny).any([
			fetchController.signal,
			timeoutSignal ?? fetchController.signal,
			signal ?? fetchController.signal,
		]);

		try {
			await options.interceptors.onRequest?.(restOfFetchConfig);

			const response = await fetch(`${options.baseURL}${url}`, {
				signal: combinedSignal,

				method,

				body: isObject(body) ? JSON.stringify(body) : body,

				headers: {
					...(isObject(body) && { "Content-Type": "application/json", Accept: "application/json" }),
					...baseHeaders,
					...headers,
				},

				...restOfBaseFetchConfig,
				...restOfFetchConfig,
			});

			const retryCodes = new Set(options.retryCodes);
			const retryMethods = new Set(options.retryMethods);

			const shouldRetry =
				!combinedSignal.aborted &&
				options.retries > 0 &&
				!response.ok &&
				retryCodes.has(response.status) &&
				retryMethods.has(method);

			if (shouldRetry) {
				await wait(options.retryDelay);

				const updatedConfig = {
					...config,
					retries: options.retries - 1,
				};

				return await callApi(url, updatedConfig);
			}

			if (!response.ok) {
				const errorResponse = await getResponseData<TError>(response, options.responseType);

				await options.interceptors.onResponseError?.({ ...response, response: errorResponse });

				throw new HTTPError({
					response: { ...response, data: errorResponse },
					defaultErrorMessage: options.defaultErrorMessage,
				});
			}

			const successResponse = await getResponseData<TData>(response, options.responseType);

			await options.interceptors.onResponse?.({ ...response, response: successResponse });

			return (
				options.shouldThrowErrors
					? successResponse
					: {
							dataInfo: successResponse,
							errorInfo: null,
							rawResponse: response,
						}
			) as CallApiResult;

			// Exhaustive Error handling
		} catch (error) {
			const handleErrorRethrow = () => {
				if (!options.shouldThrowErrors) return;

				throw error;
			};

			if (error instanceof DOMException && error.name === "TimeoutError") {
				const message = `Request timed out after ${options.timeout}ms`;

				console.info(`%cTimeoutError: ${message}`, "color: red; font-weight: 500; font-size: 14px;");

				handleErrorRethrow();

				return {
					dataInfo: null,
					errorInfo: {
						errorName: "TimeoutError",
						message,
					},
				} as CallApiResult;
			}

			if (error instanceof DOMException && error.name === "AbortError") {
				const message = `Request was cancelled`;

				console.error(`%AbortError: ${message}`, "color: red; font-weight: 500; font-size: 14px;");

				handleErrorRethrow();

				return {
					dataInfo: null,
					errorInfo: {
						errorName: "AbortError",
						message,
					},
				} as CallApiResult;
			}

			if (isHTTPErrorInstance<TError>(error)) {
				const { data: errorResponse } = error.response;

				handleErrorRethrow();

				return {
					dataInfo: null,
					errorInfo: {
						errorName: "HTTPError",
						response: errorResponse,
						message: (errorResponse as PossibleErrorType).message ?? options.defaultErrorMessage,
					},
				} as CallApiResult;
			}

			await options.interceptors.onRequestError?.(restOfFetchConfig);

			handleErrorRethrow();

			return {
				dataInfo: null,
				errorInfo: {
					errorName: (error as PossibleErrorType).name ?? "UnknownError",
					message: (error as PossibleErrorType).message ?? options.defaultErrorMessage,
				},
			} as CallApiResult;

			// Clean up and remove the now unneeded AbortController from store
		} finally {
			abortControllerStore.delete(url);
		}
	};

	callApi.abort = (url: `/${string}`) => {
		const controller = abortControllerStore.get(url);

		controller && controller.abort();
	};

	callApi.isHTTPError = isHTTPError;
	callApi.isHTTPErrorObject = isHTTPErrorInstance;
	callApi.native = fetch;
	callApi.raw = createRawCallApi<TBaseData, TBaseError, TBaseShouldThrow>({
		baseBody,
		baseExtraOptions,
		baseHeaders,
		baseMethod,
		baseSignal,
		restOfBaseFetchConfig,
		abortControllerStore,
	});

	return callApi;
};

export { createFetcher };
