import { isFunction, isObject } from "@/lib/type-helpers/typeof";
import { parseJSON } from "@/lib/utils/parseJSON";
import { wait } from "@/lib/utils/wait";
import type {
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
	isHTTPError,
	isHTTPErrorInstance,
	mergeUrlWithParams,
	objectifyHeaders,
	omitFetchConfig,
	pickFetchConfig,
} from "./create-fetcher.utils";

const createFetcher = <TBaseData, TBaseErrorData, TBaseResultStyle extends ResultStyleUnion = undefined>(
	baseConfig: BaseConfig<TBaseData, TBaseErrorData, TBaseResultStyle> = {}
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
		TErrorData = TBaseErrorData,
		TResultStyle extends ResultStyleUnion = TBaseResultStyle,
	>(
		url: `/${string}`,
		config: FetchConfig<TData, TErrorData, TResultStyle> = {}
	): Promise<GetCallApiResult<TData, TErrorData, TResultStyle>> => {
		// == This type is used to cast all return statements due to a design limitation in ts. Casting as intersection of all props in the resultmap could work too, or it resultant "never" could work too!. //LINK - See https://www.zhenghao.io/posts/type-functions for more info
		type CallApiResult = GetCallApiResult<TData, TErrorData, TResultStyle>;

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

		// FIXME -  Remove this type cast once TS updates its libdom types for AbortSignal to include the any() method
		const combinedSignal = (AbortSignal as AbortSignalWithAny).any([
			fetchController.signal,
			timeoutSignal ?? fetchController.signal,
			signal ?? fetchController.signal,
		]);

		const requestInit = {
			signal: combinedSignal,

			method,

			body: isObject(body) ? options.bodySerializer(body) : body,

			// == Return undefined if there are no headers or if the body is not an object
			headers:
				// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
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
		};

		try {
			await options.interceptors.onRequest?.({ request: requestInit, options });

			const response = await fetch(
				`${options.baseURL}${mergeUrlWithParams(url, options.query)}`,
				requestInit
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

				return await callApi(url, { ...config, retries: options.retries - 1 });
			}

			if (!response.ok) {
				const errorData = await getResponseData<TErrorData>(
					response,
					options.responseType,
					options.responseParser
				);

				await options.interceptors.onResponseError?.({
					response: { ...response, errorData },
					request: requestInit,
					options,
				});

				// == Pushing all error handling responsbility to catch
				throw new HTTPError({
					response: { ...response, errorData },
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
				request: requestInit,
				options,
			});

			const resolveSuccessResult = (): CallApiResult => {
				const apiDetails = {
					dataInfo: successResponse,
					errorInfo: null,
					response: { ...response, data: successResponse },
				};

				if (!options.resultStyle) {
					return apiDetails as CallApiResult;
				}

				return {
					all: apiDetails,
					onlySuccess: apiDetails.dataInfo,
					onlyError: apiDetails.errorInfo,
					onlyResponse: apiDetails.response,
				}[options.resultStyle] as CallApiResult;
			};

			return resolveSuccessResult();

			// == Exhaustive Error handling
		} catch (error) {
			type Info = {
				message?: string;
				errorData?: unknown;
				response?: Response;
			};

			const resolveErrorResult = (info: Info = {}): CallApiResult => {
				const shouldThrowOnError = isFunction(options.throwOnError)
					? options.throwOnError(error as Error)
					: options.throwOnError;

				if (shouldThrowOnError) {
					throw error;
				}

				const { message, response, errorData } = info;

				const apiDetails = {
					dataInfo: null,
					errorInfo: {
						errorName: (error as PossibleError).name ?? "UnknownError",
						...(Boolean(errorData) && { errorData }),
						message: message ?? (error as PossibleError).message ?? options.defaultErrorMessage,
					},
					response: response ?? null,
				};

				return apiDetails as CallApiResult;
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
				const { errorData, ...responseObj } = error.response;

				return resolveErrorResult({
					errorData,
					message: (errorData as PossibleError | null)?.message,
					response: responseObj,
				});
			}

			await options.interceptors.onRequestError?.({
				request: requestInit,
				error: error as Error,
				options,
			});

			return resolveErrorResult();

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
