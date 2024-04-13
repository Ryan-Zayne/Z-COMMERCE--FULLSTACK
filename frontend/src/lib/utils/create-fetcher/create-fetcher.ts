import { isObject } from "@/lib/type-helpers/typeof";
import { omitKeys } from "../omitKeys";
import { pickKeys } from "../pickKeys";
import { wait } from "../wait";
import type {
	AbortSignalWithAny,
	BaseConfig,
	CallApiResult,
	FetchConfig,
	PossibleErrorType,
} from "./create-fetcher.types";
import {
	HTTPError,
	defaultOptions,
	fetchSpecficKeys,
	getResponseData,
	isHTTPError,
	isHTTPErrorObject,
} from "./create-fetcher.utils";

const createFetcher = <
	TBaseData,
	TBaseError = PossibleErrorType,
	TBaseShouldThrow extends boolean = false,
>(
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
	): Promise<CallApiResult<TData, TError, TShouldThrow>> => {
		type $CallApiResult = CallApiResult<TData, TError, TShouldThrow>;

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
				retryCodes.has(response.status) &&
				retryMethods.has(method);

			if (!response.ok && shouldRetry) {
				await wait(options.retryDelay);

				const updatedConfig = {
					...config,
					retries: options.retries - 1,
				};

				return await callApi(url, updatedConfig);
			}

			if (!response.ok && options.shouldThrowErrors) {
				const errorResponse = await getResponseData<TError>(response);

				throw new HTTPError({
					response: { ...response, data: errorResponse },
					defaultErrorMessage: options.defaultErrorMessage,
				});
			}

			if (!response.ok) {
				const errorResponse = await getResponseData<TError>(response);

				await options.interceptors.onResponseError?.({ ...response, response: errorResponse });

				return {
					dataInfo: null,
					errorInfo: {
						errorName: "HTTPError",
						response: errorResponse,
						message: (errorResponse as PossibleErrorType).message ?? options.defaultErrorMessage,
					},
				} as $CallApiResult;
			}

			const successResponse = await getResponseData<TData>(response);

			await options.interceptors.onResponse?.({
				...response,
				response: successResponse as TBaseData & TData,
			});

			return (
				options.shouldThrowErrors
					? successResponse
					: {
							dataInfo: successResponse,
							errorInfo: null,
						}
			) as $CallApiResult;

			// Exhaustive Error handling
		} catch (error) {
			if (error instanceof DOMException && error.name === "TimeoutError") {
				const message = `Request timed out after ${options.timeout}ms`;

				console.info(`%cTimeoutError: ${message}`, "color: red; font-weight: 500; font-size: 14px;");

				return {
					dataInfo: null,
					errorInfo: {
						errorName: "TimeoutError",
						message,
					},
				} as $CallApiResult;
			}

			if (error instanceof DOMException && error.name === "AbortError") {
				return {
					dataInfo: null,
					errorInfo: {
						errorName: "AbortError",
						message: error.message,
					},
				} as $CallApiResult;
			}

			if (options.shouldThrowErrors) {
				throw error;
			}

			await options.interceptors.onRequestError?.(restOfFetchConfig);

			return {
				dataInfo: null,
				errorInfo: {
					errorName: (error as PossibleErrorType).name ?? "UnknownError",
					message: (error as PossibleErrorType).message ?? options.defaultErrorMessage,
				},
			} as $CallApiResult;

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
	callApi.isHTTPErrorObject = isHTTPErrorObject;

	return callApi;
};

export { createFetcher };
