import { isFunction, isObject } from "@/lib/type-helpers/typeof";
import { parseJSON } from "@/lib/utils/parseJSON";
import { wait } from "@/lib/utils/wait";
import type {
	AbortSignalWithAny,
	BaseConfig,
	ExtraOptions,
	FetchConfig,
	GetCallApiResult,
	PossibleErrorType,
	ResultStyleUnion,
} from "./create-fetcher.types";
import {
	HTTPError,
	defaultRetryCodes,
	defaultRetryMethods,
	getResponseData,
	getUrlWithParams,
	isHTTPError,
	isHTTPErrorInstance,
	objectifyHeaders,
	omitFetchConfig,
	pickFetchConfig,
} from "./create-fetcher.utils";

const createFetcher = <TBaseData, TBaseError, TBaseResultStyle extends ResultStyleUnion = undefined>(
	baseConfig: BaseConfig<TBaseData, TBaseError, TBaseResultStyle> = {}
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
		TResultStyle extends ResultStyleUnion = TBaseResultStyle,
	>(
		url: `/${string}`,
		config: FetchConfig<TData, TError, TResultStyle> = {}
	): Promise<GetCallApiResult<TData, TError, TResultStyle>> => {
		// == This type is used to cast all return statements due to a design limitation in ts. Casting as intersection of all props in the resultmap could work too, or it resultant "never" could work too!. See https://www.zhenghao.io/posts/type-functions for more info
		type CallApiResult = GetCallApiResult<TData, TError, TResultStyle>;

		const {
			method = baseMethod,
			body = baseBody,
			headers,
			signal = baseSignal,
			...restOfFetchConfig
		} = pickFetchConfig(config);

		const extraOptions = omitFetchConfig(config);

		const prevFetchController = abortControllerStore.get(url);

		if (prevFetchController) {
			const reason = new DOMException("Cancelled the previous unfinished request", "AbortError");
			prevFetchController.abort(reason);
		}

		const fetchController = new AbortController();

		abortControllerStore.set(url, fetchController);

		const options = {
			interceptors: {},
			bodySerializer: JSON.stringify,
			responseParser: parseJSON,
			responseType: "json",
			baseURL: "",
			retries: 0,
			retryDelay: 0,
			retryCodes: defaultRetryCodes,
			retryMethods: defaultRetryMethods,
			defaultErrorMessage: "Failed to fetch data from server!",
			...baseExtraOptions,
			...extraOptions,
		} satisfies ExtraOptions;

		const timeoutSignal = options.timeout ? AbortSignal.timeout(options.timeout) : null;

		// ts-expect-error - TS hasn't updated its dom library for AbortSignal to include the any method
		const combinedSignal = (AbortSignal as AbortSignalWithAny).any([
			fetchController.signal,
			timeoutSignal ?? fetchController.signal,
			signal ?? fetchController.signal,
		]);

		const request = {
			signal: combinedSignal,

			method,

			body: isObject(body) ? options.bodySerializer(body) : body,

			headers:
				baseHeaders ?? headers
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
		};

		try {
			await options.interceptors.onRequest?.({ request, options });

			const response = await fetch(
				`${options.baseURL}${getUrlWithParams(url, options.query)}`,
				request
			);

			const retryCodes = new Set(options.retryCodes);
			const retryMethods = new Set(options.retryMethods);

			const shouldRetry =
				!combinedSignal.aborted &&
				options.retries > 0 &&
				!response.ok &&
				retryCodes.has(response.status) &&
				retryMethods.has(method);

			if (shouldRetry) {
				options.retryDelay > 0 && (await wait(options.retryDelay));

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
					options.responseParser
				);

				await options.interceptors.onResponseError?.({
					response: { ...response, error: errorResponse },
					request,
					options,
				});

				// == Pushing all error handling responsbility to catch
				throw new HTTPError({
					response: { ...response, data: errorResponse },
					defaultErrorMessage: options.defaultErrorMessage,
				});
			}

			const successResponse = await getResponseData<TData>(
				response,
				options.responseType,
				options.responseParser
			);

			await options.interceptors.onResponse?.({
				response: { ...response, data: successResponse },
				request,
				options,
			});

			const RESULT_STYLE_LOOKUP = (resultStyle: ResultStyleUnion) => {
				const apiDetails = {
					dataInfo: successResponse,
					errorInfo: null,
					response: { ...response, data: successResponse },
				};

				return (
					!resultStyle
						? apiDetails
						: {
								all: apiDetails,
								onlySuccess: apiDetails.dataInfo,
								onlyError: apiDetails.errorInfo,
								onlyResponse: apiDetails.response,
							}[resultStyle]
				) as CallApiResult;
			};

			return RESULT_STYLE_LOOKUP(options.resultStyle);

			// == Exhaustive Error handling
		} catch (error) {
			const RESULT_STYLE_LOOKUP = (info: { message?: string; response?: Response }) => {
				const { message = options.defaultErrorMessage, response } = info;

				const apiDetails = {
					dataInfo: null,
					errorInfo: {
						errorName: (error as PossibleErrorType).name ?? "UnknownError",
						message,
					},
					response: response ?? null,
				};

				return apiDetails;
			};

			const handleShouldRethrowError = () => {
				const shouldThrowOnError = isFunction(options.throwOnError)
					? options.throwOnError(error as Error)
					: options.throwOnError;

				if (!shouldThrowOnError) return;

				throw error;
			};

			if (error instanceof DOMException && error.name === "TimeoutError") {
				const message = `Request timed out after ${options.timeout}ms`;

				console.info(`%cTimeoutError: ${message}`, "color: red; font-weight: 500; font-size: 14px;");

				handleShouldRethrowError();

				return {
					dataInfo: null,
					errorInfo: {
						errorName: error.name,
						message,
					},
					response: null,
				} as never;
			}

			if (error instanceof DOMException && error.name === "AbortError") {
				const message = `Request was cancelled`;

				console.error(`%AbortError: ${message}`, "color: red; font-weight: 500; font-size: 14px;");

				handleShouldRethrowError();

				return RESULT_STYLE_LOOKUP({ message }) as CallApiResult;
			}

			if (isHTTPErrorInstance<TError>(error)) {
				const { data: errorResponse, ...responseObj } = error.response;

				handleShouldRethrowError();

				return RESULT_STYLE_LOOKUP({
					message: (errorResponse as PossibleErrorType).message,
					response: responseObj,
				}) as CallApiResult;
			}

			// == At this point only request errors exist
			await options.interceptors.onRequestError?.({ request, options, error: error as Error });

			handleShouldRethrowError();

			return RESULT_STYLE_LOOKUP({ message: (error as PossibleErrorType).message }) as CallApiResult;
			// Remove the now unneeded AbortController from store
		} finally {
			abortControllerStore.delete(url);
		}
	};

	callApi.abort = (url: `/${string}`) => abortControllerStore.get(url)?.abort();
	callApi.isHTTPError = isHTTPError;
	callApi.isHTTPErrorInstance = isHTTPErrorInstance;
	callApi.native = fetch;

	return callApi;
};

export { createFetcher };
