import type { PrettyOmit } from "@/lib/type-helpers/global-type-helpers";
import { isObject } from "@/lib/type-helpers/typeof";
import { omitKeys } from "@/lib/utils/omitKeys";
import { parseJSON } from "@/lib/utils/parseJSON";
import { pickKeys } from "@/lib/utils/pickKeys";
import { wait } from "@/lib/utils/wait";
import type {
	AbortSignalWithAny,
	BaseConfig,
	FetchConfig,
	GetRawCallApiResult,
	PossibleErrorType,
} from "./create-fetcher.types";

export const getUrlWithParams = (url: string, params: Record<string, string> | undefined) => {
	if (!params) {
		return url;
	}

	const paramsString = new URLSearchParams(params).toString();

	if (!url.includes("?")) {
		return `${url}?${paramsString}`;
	}

	if (url.at(-1) === "?") {
		return `${url}${paramsString}`;
	}

	return `${url}&${paramsString}`;
};

export const createResponseLookup = <TResponse>(
	response: Response,
	parser: Required<BaseConfig>["parser"]
) => ({
	json: async () => {
		const data = parser<TResponse | null>(await response.text());

		// == try native response.json() as last resort of parser fails
		return data ?? (response.json() as Promise<TResponse>);
	},
	arrayBuffer: () => response.arrayBuffer() as Promise<TResponse>,
	blob: () => response.blob() as Promise<TResponse>,
	formData: () => response.formData() as Promise<TResponse>,
	text: () => response.text() as Promise<TResponse>,
});

export const getResponseData = <TResponse>(
	response: Response,
	responseType: keyof ReturnType<typeof createResponseLookup>,
	parser: Required<BaseConfig>["parser"]
) => {
	const RESPONSE_LOOKUP = createResponseLookup<TResponse>(response, parser);

	if (!Object.hasOwn(RESPONSE_LOOKUP, responseType)) {
		throw new Error(`Invalid response type: ${responseType}`);
	}

	return RESPONSE_LOOKUP[responseType]();
};

const retryCodesLookup = {
	408: "Request Timeout",
	409: "Conflict",
	425: "Too Early",
	429: "Too Many Requests",
	500: "Internal Server Error",
	502: "Bad Gateway",
	503: "Service Unavailable",
	504: "Gateway Timeout",
};

export const defaultRetryCodes: Required<BaseConfig>["retryCodes"] =
	Object.keys(retryCodesLookup).map(Number);

export const defaultRetryMethods: Required<BaseConfig>["retryMethods"] = ["GET"];

const fetchSpecficKeys = [
	"body",
	"integrity",
	"method",
	"headers",
	"signal",
	"cache",
	"redirect",
	"window",
	"credentials",
	"keepalive",
	"referrer",
	"priority",
	"mode",
	"referrerPolicy",
] satisfies Array<keyof BaseConfig>;

export const pickFetchConfig = <TObject extends Record<string, unknown>>(config: TObject) =>
	pickKeys(config, fetchSpecficKeys);
export const omitFetchConfig = <TObject extends Record<string, unknown>>(config: TObject) =>
	omitKeys(config, fetchSpecficKeys);

export const defaultOptions = {
	interceptors: {} as Required<BaseConfig>["interceptors"],
	stringifier: JSON.stringify,
	parser: parseJSON,
	responseType: "json",
	baseURL: "",
	retries: 0,
	retryDelay: 0,
	retryCodes: defaultRetryCodes,
	retryMethods: defaultRetryMethods,
	defaultErrorMessage: "Failed to fetch data from server!",
	shouldThrowErrors: false,
} satisfies BaseConfig;

export const isHTTPError = (errorName: unknown): errorName is "HTTPError" => errorName === "HTTPError";

type ErrorDetails<TErrorResponse> = {
	response: Response & { data: TErrorResponse };
	defaultErrorMessage: string;
};

export class HTTPError<TErrorResponse = Record<string, unknown>> extends Error {
	response: ErrorDetails<TErrorResponse>["response"];

	override name = "HTTPError";

	isHTTPError = true;

	constructor(errorDetails: ErrorDetails<TErrorResponse>) {
		const { defaultErrorMessage, response } = errorDetails;

		super((response as { message?: string }).message ?? defaultErrorMessage);

		this.response = response;
	}
}

export const isHTTPErrorInstance = <TErrorResponse>(
	error: unknown
): error is HTTPError<TErrorResponse> => {
	return (
		(isObject(error) && error.name === "HTTPError" && error.isHTTPError === true) ||
		error instanceof HTTPError
	);
};

type BaseStuff<TBaseData, TBaseError, TBaseShouldThrow extends boolean> = {
	baseMethod: Required<BaseConfig>["method"];
	baseHeaders: BaseConfig["headers"];
	baseBody: BaseConfig["body"];
	baseSignal: BaseConfig["signal"];
	baseExtraOptions: PrettyOmit<
		BaseConfig<TBaseData, TBaseError, TBaseShouldThrow>,
		(typeof fetchSpecficKeys)[number]
	>;
	restOfBaseFetchConfig: PrettyOmit<
		Pick<BaseConfig, (typeof fetchSpecficKeys)[number]>,
		"body" | "signal" | "method" | "headers"
	>;
	abortControllerStore: Map<`/${string}`, AbortController>;
};

export const createRawCallApi = <TBaseData, TBaseError, TBaseShouldThrow extends boolean>(
	baseStuff: BaseStuff<TBaseData, TBaseError, TBaseShouldThrow>
) => {
	const {
		baseMethod,
		baseBody,
		baseSignal,
		baseHeaders,
		restOfBaseFetchConfig,
		baseExtraOptions,
		abortControllerStore,
	} = baseStuff;

	const rawCallApi = async <
		TData = TBaseData,
		TError = TBaseError,
		TShouldThrow extends boolean = TBaseShouldThrow,
	>(
		url: `/${string}`,
		config: FetchConfig<TData, TError, TShouldThrow> = {}
	): Promise<GetRawCallApiResult<TData, TError, TShouldThrow>> => {
		type RawCallApiResult = GetRawCallApiResult<TData, TError, TShouldThrow>;

		const {
			method = baseMethod,
			body = baseBody,
			headers,
			signal = baseSignal,
			...restOfFetchConfig
		} = pickFetchConfig(config);

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

		const request = {
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
		};

		try {
			await options.interceptors.onRequest?.({ request, options });

			const response = await fetch(`${options.baseURL}${getUrlWithParams(url, options.query)}`);

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

				return await rawCallApi(url, updatedConfig);
			}

			if (!response.ok) {
				const errorResponse = await getResponseData<TError>(
					response,
					options.responseType,
					options.parser
				);

				await options.interceptors.onResponseError?.({
					response: { ...response, error: errorResponse },
					request,
					options,
				});

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

			await options.interceptors.onResponse?.({
				response: { ...response, data: successResponse },
				request,
				options,
			});

			return (
				options.shouldThrowErrors
					? response
					: {
							response,
							dataInfo: successResponse,
							errorInfo: null,
						}
			) as RawCallApiResult;

			// Exhaustive Error handling
		} catch (error) {
			const handleShouldRethrowError = () => {
				if (!options.shouldThrowErrors) return;

				throw error;
			};

			if (error instanceof DOMException && error.name === "TimeoutError") {
				const message = `Request timed out after ${options.timeout}ms`;

				console.error(`%cTimeoutError: ${message}`, "color: red; font-weight: 500; font-size: 14px;");

				handleShouldRethrowError();

				return {
					response: null,
					dataInfo: null,
					errorInfo: {
						errorName: "TimeoutError",
						message,
					},
				} as RawCallApiResult;
			}

			if (error instanceof DOMException && error.name === "AbortError") {
				const message = `Request was cancelled`;

				console.error(`%AbortError: ${message}`, "color: red; font-weight: 500; font-size: 14px;");

				handleShouldRethrowError();

				return {
					response: null,
					dataInfo: null,
					errorInfo: {
						errorName: "AbortError",
						message,
					},
				} as RawCallApiResult;
			}

			if (isHTTPErrorInstance<TError>(error)) {
				const { data: errorResponse, ...actualResponse } = error.response;

				handleShouldRethrowError();

				return {
					response: actualResponse,
					dataInfo: null,
					errorInfo: {
						errorName: "HTTPError",
						response: errorResponse,
						message: (errorResponse as PossibleErrorType).message ?? options.defaultErrorMessage,
					},
				} as RawCallApiResult;
			}

			await options.interceptors.onRequestError?.({ request, options, error: error as Error });

			handleShouldRethrowError();

			return {
				response: null,
				dataInfo: null,
				errorInfo: {
					errorName: (error as PossibleErrorType).name ?? "UnknownError",
					message: (error as PossibleErrorType).message ?? options.defaultErrorMessage,
				},
			} as RawCallApiResult;

			// Clean up and remove the now unneeded AbortController from store
		} finally {
			abortControllerStore.delete(url);
		}
	};

	return rawCallApi;
};
