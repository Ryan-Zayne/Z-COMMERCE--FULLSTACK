import type { AnyNumber, AnyString, Prettify } from "@/lib/type-helpers/global-type-helpers";
import type { isHTTPError, isHTTPErrorObject } from "./create-fetcher.utils";

export type BaseConfig<
	TBaseData = unknown,
	TBaseError = unknown,
	TBaseShouldThrow extends boolean = false,
> = Prettify<
	Omit<RequestInit, "method" | "body" | "signal" | "headers"> & {
		body?: Record<string, unknown> | FormData | string;

		method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE" | AnyString;

		headers?: Record<string, string>;

		signal?: AbortSignal;

		baseURL?: string;

		timeout?: number;

		defaultErrorMessage?: string;

		shouldThrowErrors?: TBaseShouldThrow;

		interceptors?: {
			onRequest?: (requestConfig: RequestInit) => Promise<RequestInit> | RequestInit;

			onRequestError?: (requestConfig: RequestInit) => Promise<RequestInit> | RequestInit;

			onResponse?: <TData = TBaseData>(
				successResponse: Response & { response: TData }
			) => Promise<void> | void;

			onResponseError?: <TError = TBaseError>(
				errorResponse: Response & { response: TError }
			) => Promise<void> | void;
		};

		retries?: number;
		retryCodes?: Array<409 | 425 | 429 | 500 | 502 | 503 | 504 | AnyNumber>;
		retryDelay?: number;
		retryMethods?: Array<"GET" | "POST" | "PATCH" | "DELETE" | AnyString>;
	}
>;

export type FetchConfig<TData, TError, TShouldThrow extends boolean> = BaseConfig<
	TData,
	TError,
	TShouldThrow
>;

export type ApiResult<TData, TError> =
	| {
			dataInfo: TData;
			errorInfo: null;
	  }
	| {
			dataInfo: null;
			errorInfo:
				| {
						errorName: "HTTPError";
						response: TError;
						message: string;
				  }
				| {
						// eslint-disable-next-line no-use-before-define
						errorName: Required<PossibleErrorType>["name"];
						message: string;
				  };
	  };

// == Old implementation with overloads (wasn't flexible enough to infer return type based on parent)
// export type CallApi<TBaseData, TBaseError> = {
// 	<TData = TBaseData, TError = TBaseError>(
// 		url: `/${string}`,
// 		config?: FetchConfig<TData, TError, false>
// 	): Promise<ApiResult<TData, TError>>;

// 	<TData = TBaseData, TError = TBaseError>(
// 		url: `/${string}`,
// 		config?: FetchConfig<TData, TError, true>
// 	): Promise<TData>;

// 	abort: (url: `/${string}`) => void;
// 	isHTTPError: typeof isHTTPError;
// 	isHTTPErrorObject: typeof isHTTPErrorObject;
// };

export type CallApiResult<TData, TError, TShouldThrow extends boolean> = TShouldThrow extends false
	? ApiResult<TData, TError>
	: TData;

export type PossibleErrorType = {
	name?: "AbortError" | "TimeoutError" | "SyntaxError" | "TypeError" | "Error" | "UnknownError";
	message?: string;
};

export type AbortSignalWithAny = typeof AbortSignal & { any(signals: AbortSignal[]): AbortSignal };
