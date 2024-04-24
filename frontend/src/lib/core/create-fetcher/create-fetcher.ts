import { isObject } from "@/lib/type-helpers/typeof";
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
	getResponseData,
	getUrlWithParams,
	isHTTPError,
	isHTTPErrorInstance,
	omitFetchConfig,
	pickFetchConfig,
} from "./create-fetcher.utils";

const createFetcher = <TBaseData, TBaseError, TBaseShouldThrow extends boolean = false>(
	baseConfig: BaseConfig<TBaseData, TBaseError, TBaseShouldThrow> = {}
) => {
	const abortControllerStore = new Map<`/${string}`, AbortController>();

	const {
		method: baseMethod = "GET",
		body: baseBody,
		headers: baseHeaders,
		signal: baseSignal,
		...restOfBaseFetchConfig
	} = pickFetchConfig(baseConfig);

	const baseExtraOptions = omitFetchConfig(baseConfig);

	const callApi = async <
		TData = TBaseData,
		TError = TBaseError,
		TShouldThrow extends boolean = TBaseShouldThrow,
	>(
		url: `/${string}`,
		config: FetchConfig<TData, TError, TShouldThrow> = {}
	): Promise<GetCallApiResult<TData, TError, TShouldThrow>> => {
		type CallApiResult = GetCallApiResult<TData, TError, TShouldThrow>;

		const actualFetchConfig = pickFetchConfig(config);

		const {
			method = baseMethod,
			body = baseBody,
			headers,
			signal = baseSignal,
			...restOfFetchConfig
		} = actualFetchConfig;

		const extraOptions = omitFetchConfig(config);

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
			await options.interceptors.onRequest?.(actualFetchConfig as RequestInit);

			const response = await fetch(`${options.baseURL}${getUrlWithParams(url, options.params)}`, {
				signal: combinedSignal,

				method,

				body: isObject(body) ? options.stringifier(body) : body,

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
				const errorResponse = await getResponseData<TError>(
					response,
					options.responseType,
					options.parser
				);

				await options.interceptors.onResponseError?.({ ...response, response: errorResponse });

				throw new HTTPError({
					response: { ...response, data: errorResponse },
					defaultErrorMessage: options.defaultErrorMessage,
				});
			}

			const successResponse = await getResponseData<TData>(
				response,
				options.responseType,
				options.parser
			);

			await options.interceptors.onResponse?.({ ...response, response: successResponse });

			return (
				options.shouldThrowErrors
					? successResponse
					: {
							dataInfo: successResponse,
							errorInfo: null,
						}
			) as CallApiResult;

			// Exhaustive Error handling
		} catch (error) {
			const handleShouldRethrowError = () => {
				if (!options.shouldThrowErrors) return;

				throw error;
			};

			if (error instanceof DOMException && error.name === "TimeoutError") {
				const message = `Request timed out after ${options.timeout}ms`;

				console.info(`%cTimeoutError: ${message}`, "color: red; font-weight: 500; font-size: 14px;");

				handleShouldRethrowError();

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

				handleShouldRethrowError();

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

				handleShouldRethrowError();

				return {
					dataInfo: null,
					errorInfo: {
						errorName: "HTTPError",
						response: errorResponse,
						message: (errorResponse as PossibleErrorType).message ?? options.defaultErrorMessage,
					},
				} as CallApiResult;
			}

			// == At this point only request errors exist

			await options.interceptors.onRequestError?.(restOfFetchConfig);

			handleShouldRethrowError();

			return {
				dataInfo: null,
				errorInfo: {
					errorName: (error as PossibleErrorType).name ?? "UnknownError",
					message: (error as PossibleErrorType).message ?? options.defaultErrorMessage,
				},
			} as CallApiResult;

			// Remove the now unneeded AbortController from store
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
