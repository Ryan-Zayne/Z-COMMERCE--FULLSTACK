import { isObject } from "@/lib/type-helpers/typeof";
import { wait } from "@/lib/utils/wait";
import type {
	$RequestConfig,
	AbortSignalWithAny,
	BaseConfig,
	ExtraOptions,
	FetchConfig,
	GetCallApiResult,
	PossibleError,
	ResultStyleUnion,
} from "./create-fetcher.types";
import {
	HTTPError,
	defaultRetryCodes,
	defaultRetryMethods,
	getResponseData,
	isHTTPErrorInfo,
	isHTTPErrorInstance,
	mergeUrlWithParams,
	objectifyHeaders,
	resolveResult,
	splitConfig,
} from "./create-fetcher.utils";

const createFetcher = <TBaseData, TBaseErrorData, TBaseResultMode extends ResultStyleUnion = undefined>(
	baseConfig: BaseConfig<TBaseData, TBaseErrorData, TBaseResultMode> = {}
) => {
	const abortControllerStore = new Map<string, AbortController>();

	const [baseFetchConfig, baseExtraOptions] = splitConfig(baseConfig);

	const { headers: baseHeaders, signal: baseSignal, ...restOfBaseFetchConfig } = baseFetchConfig;

	const callApi = async <
		TData = TBaseData,
		TErrorData = TBaseErrorData,
		TResultMode extends ResultStyleUnion = TBaseResultMode,
	>(
		url: string,
		config: FetchConfig<TData, TErrorData, TResultMode> = {}
	): Promise<GetCallApiResult<TData, TErrorData, TResultMode>> => {
		// == This type is used to cast all return statements due to a design limitation in ts.
		// LINK - See https://www.zhenghao.io/posts/type-functions for more info
		type CallApiResult = GetCallApiResult<TData, TErrorData, TResultMode>;

		const [fetchConfig, extraOptions] = splitConfig(config);

		const options = {
			bodySerializer: JSON.stringify,
			responseType: "json",
			baseURL: "",
			retries: 0,
			retryDelay: 0,
			retryCodes: defaultRetryCodes,
			retryMethods: defaultRetryMethods,
			defaultErrorMessage: "Failed to fetch data from server!",
			shouldCancelRedundantRequests: true,
			...baseExtraOptions,
			...extraOptions,
		} satisfies ExtraOptions;

		const { signal = baseSignal, body, headers, ...restOfFetchConfig } = fetchConfig;

		const prevFetchController = abortControllerStore.get(url);

		if (prevFetchController && options.shouldCancelRedundantRequests) {
			const reason = new DOMException("Cancelled the previous unfinished request", "AbortError");
			prevFetchController.abort(reason);
		}

		const fetchController = new AbortController();

		abortControllerStore.set(url, fetchController);

		const timeoutSignal = options.timeout ? AbortSignal.timeout(options.timeout) : null;

		// FIXME - Remove this type cast once TS updates its lib-dom types for AbortSignal to include the any() method
		const combinedSignal = (AbortSignal as AbortSignalWithAny).any([
			fetchController.signal,
			timeoutSignal ?? fetchController.signal,
			signal ?? fetchController.signal,
		]);

		const requestInit = {
			signal: combinedSignal,

			method: "GET",

			body: isObject(body) ? options.bodySerializer(body) : body,

			/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
			// == Return undefined if there are no headers provided or if the body is not an object
			headers:
				baseHeaders || headers || isObject(body)
					? {
							...(isObject(body) && {
								"Content-Type": "application/json",
								Accept: "application/json",
							}),
							...objectifyHeaders(baseHeaders),
							...objectifyHeaders(headers),
						}
					: undefined,

			...restOfBaseFetchConfig,
			...restOfFetchConfig,
		} satisfies $RequestConfig;

		try {
			await options.onRequest?.({ request: requestInit, options });

			const response = await fetch(
				`${options.baseURL}${mergeUrlWithParams(url, options.query)}`,
				requestInit
			);

			const shouldRetry =
				!combinedSignal.aborted &&
				options.retries !== 0 &&
				!response.ok &&
				options.retryCodes.includes(response.status) &&
				options.retryMethods.includes(requestInit.method);

			if (shouldRetry) {
				await wait(options.retryDelay);

				return await callApi(url, { ...config, retries: options.retries - 1 });
			}

			if (!response.ok) {
				const errorData = await getResponseData<TErrorData>(
					response,
					options.responseType,
					options.responseParser
				);

				const errorResponseInfo = { ...response, errorData };

				await options.onResponseError?.({
					response: errorResponseInfo,
					request: requestInit,
					options,
				});

				// == Pushing all error handling responsbility to catch
				throw new HTTPError({
					response: errorResponseInfo,
					defaultErrorMessage: options.defaultErrorMessage,
				});
			}

			const successData = await getResponseData<TData>(
				response,
				options.responseType,
				options.responseParser
			);

			await options.onResponse?.({
				response: { ...response, data: successData },
				request: requestInit,
				options,
			});

			return resolveResult<CallApiResult, TData>({ type: "success", successData, response, options });

			// == Exhaustive Error handling
		} catch (error) {
			type ErrorDetails = {
				message?: string;
				errorData?: unknown;
				response?: Response;
			};

			const resolveErrorResult = (errorDetails: ErrorDetails = {}) => {
				const { errorData, response, message } = errorDetails;

				return resolveResult<CallApiResult>({
					type: "error",
					error,
					options,
					errorData,
					response,
					message,
				});
			};

			if (error instanceof DOMException && error.name === "TimeoutError") {
				const message = `Request timed out after ${options.timeout}ms`;

				console.info(`%cTimeoutError: ${message}`, "color: red; font-weight: 500; font-size: 14px;");

				return resolveErrorResult({ message });
			}

			if (error instanceof DOMException && error.name === "AbortError") {
				const message = `Request was cancelled`;

				console.error(`%AbortError: ${message}`, "color: red; font-weight: 500; font-size: 14px;");

				return resolveErrorResult({ message });
			}

			if (isHTTPErrorInstance<TErrorData>(error)) {
				const { errorData, ...response } = error.response;

				return resolveErrorResult({
					errorData,
					response,
					message: (errorData as PossibleError | undefined)?.message,
				});
			}

			await options.onRequestError?.({ request: requestInit, error: error as Error, options });

			return resolveErrorResult();

			// Remove the now unneeded AbortController from store
		} finally {
			abortControllerStore.delete(url);
		}
	};

	callApi.abort = (url: string) => abortControllerStore.get(url)?.abort();
	callApi.isHTTPErrorInfo = isHTTPErrorInfo;
	callApi.isHTTPErrorInstance = isHTTPErrorInstance;
	callApi.create = createFetcher;

	return callApi;
};

export default createFetcher();
