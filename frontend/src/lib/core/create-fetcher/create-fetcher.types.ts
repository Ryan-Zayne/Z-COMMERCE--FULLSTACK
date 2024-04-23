import type { AnyNumber, AnyString, Prettify } from "@/lib/type-helpers/global-type-helpers";
import type { createResponseLookup } from "./create-fetcher.utils";

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

		responseType?: keyof ReturnType<typeof createResponseLookup>;

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

export type AbortSignalWithAny = typeof AbortSignal & { any: (signals: AbortSignal[]) => AbortSignal };

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
				response: TError;
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

export type GetRawCallApiResult<TData, TError, TShouldThrow extends boolean> = TShouldThrow extends false
	? RawSuccessVariant<TData> | RawErrorVariant<TError>
	: Response;

export type PossibleErrorType = {
	name?: "AbortError" | "TimeoutError" | "SyntaxError" | "TypeError" | "Error" | "UnknownError";
	message?: string;
};
