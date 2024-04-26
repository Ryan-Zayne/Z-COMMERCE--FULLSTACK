import type { AnyNumber, AnyString } from "@/lib/type-helpers/global-type-helpers";
import type { createResponseLookup, omitFetchConfig, pickFetchConfig } from "./create-fetcher.utils";

export type BaseConfig<
	TBaseData = unknown,
	TBaseError = unknown,
	TBaseShouldThrow extends boolean = boolean,
> = Omit<RequestInit, "method" | "body" | "signal" | "headers"> & {
	body?: Record<string, unknown> | BodyInit;

	method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE" | AnyString;

	query?: Record<string, string>;

	stringifier?: <TData>(bodyData: TData) => string;

	parser?: <TData>(responseData: string) => TData;

	headers?: Record<string, string>;

	signal?: AbortSignal;

	baseURL?: string;

	timeout?: number;

	defaultErrorMessage?: string;

	shouldThrowErrors?: TBaseShouldThrow;

	responseType?: keyof ReturnType<typeof createResponseLookup>;

	interceptors?: {
		onRequest?: (requestContext: {
			request: ReturnType<typeof pickFetchConfig<BaseConfig>>;
			options: ReturnType<typeof omitFetchConfig<BaseConfig>>;
		}) => void | Promise<void>;

		onRequestError?: (requestContext: {
			request: ReturnType<typeof pickFetchConfig<BaseConfig>>;
			options: ReturnType<typeof omitFetchConfig<BaseConfig>>;
			error: Error;
		}) => void | Promise<void>;

		onResponse?: <TData = TBaseData>(successContext: {
			response: Response & { data: TData };
			request: ReturnType<typeof pickFetchConfig<BaseConfig>>;
			options: ReturnType<typeof omitFetchConfig<BaseConfig>>;
		}) => void | Promise<void>;

		onResponseError?: <TError = TBaseError>(errorContext: {
			response: Response & { error: TError };
			request: ReturnType<typeof pickFetchConfig<BaseConfig>>;
			options: ReturnType<typeof omitFetchConfig<BaseConfig>>;
		}) => void | Promise<void>;
	};

	retries?: number;
	retryCodes?: Array<409 | 425 | 429 | 500 | 502 | 503 | 504 | AnyNumber>;
	retryDelay?: number;
	retryMethods?: Array<"GET" | "POST" | "PATCH" | "DELETE" | AnyString>;
};

export type FetchConfig<TData, TError, TShouldThrow extends boolean> = BaseConfig<
	TData,
	TError,
	TShouldThrow
>;

type ApiSuccessVariant<TData> = {
	dataInfo: TData;
	errorInfo: null;
};

export type ApiErrorVariant<TError> = {
	dataInfo: null;
	errorInfo:
		| {
				errorName: "HTTPError";
				message: string;
				response: Response & { error: TError };
		  }
		| {
				errorName: Required<PossibleErrorType>["name"];
				message: string;
		  };
};

export type GetCallApiResult<TData, TError, TShouldThrow extends boolean> = TShouldThrow extends false
	? ApiSuccessVariant<TData> | ApiErrorVariant<TError>
	: TData;

type RawSuccessVariant<TData> = {
	dataInfo: TData;
	errorInfo: null;
	response: Response;
};

type RawErrorVariant<TError> =
	| {
			response: Response;
			dataInfo: null;
			errorInfo: {
				errorName: "HTTPError";
				message: string;
				response: TError;
			};
	  }
	| {
			response: null;
			dataInfo: null;
			errorInfo: {
				errorName: Required<PossibleErrorType>["name"];
				message: string;
			};
	  };

export type AbortSignalWithAny = typeof AbortSignal & { any: (signalArray: AbortSignal[]) => AbortSignal };

export type GetRawCallApiResult<TData, TError, TShouldThrow extends boolean> = TShouldThrow extends false
	? RawSuccessVariant<TData> | RawErrorVariant<TError>
	: Response;

export type PossibleErrorType = {
	name?: "AbortError" | "TimeoutError" | "SyntaxError" | "TypeError" | "Error" | "UnknownError";
	message?: string;
};
