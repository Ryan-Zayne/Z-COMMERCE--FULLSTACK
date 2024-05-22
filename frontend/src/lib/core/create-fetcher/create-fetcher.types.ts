import type { AnyNumber, AnyString } from "@/lib/type-helpers/global-type-helpers";
import type { HTTPError, createResponseLookup, fetchSpecficKeys } from "./create-fetcher.utils";

export type $BaseRequestConfig = Pick<FetchConfig, Exclude<(typeof fetchSpecficKeys)[number], "body">>;
export type $RequestConfig = Pick<FetchConfig, (typeof fetchSpecficKeys)[number]>;

export type ExtraOptions<
	TBaseData = unknown,
	TBaseErrorData = unknown,
	TBaseResultMode extends ResultStyleUnion = ResultStyleUnion,
> = {
	body?: Record<string, unknown> | RequestInit["body"];

	method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE" | AnyString;

	query?: Record<string, string | number | boolean>;

	bodySerializer?: (bodyData: Record<string, unknown>) => string;

	responseParser?: {
		(data: string): unknown;
		<TData>(data: string): TData;
	};

	resultMode?: TBaseResultMode;

	shouldCancelRedundantRequests?: boolean;

	baseURL?: string;

	timeout?: number;

	defaultErrorMessage?: string;

	throwOnError?: boolean | ((error?: Error | HTTPError<TBaseErrorData>) => boolean);

	responseType?: keyof ReturnType<typeof createResponseLookup>;

	retries?: number;

	retryDelay?: number;

	retryCodes?: Array<409 | 425 | 429 | 500 | 502 | 503 | 504 | AnyNumber>;

	retryMethods?: Array<"GET" | "POST" | "PATCH" | "DELETE" | AnyString>;

	meta?: Record<string, unknown>;

	onRequest?: (requestContext: {
		request: $RequestConfig;
		options: ExtraOptions;
	}) => void | Promise<void>;

	onRequestError?: (requestContext: {
		request: $RequestConfig;
		error: Error;
		options: ExtraOptions;
	}) => void | Promise<void>;

	onResponse?: <TData = TBaseData>(successContext: {
		response: Response & { data: TData };
		request: $RequestConfig;
		options: ExtraOptions;
	}) => void | Promise<void>;

	onResponseError?: <TErrorData = TBaseErrorData>(errorContext: {
		response: Response & { errorData: TErrorData };
		request: $RequestConfig;
		options: ExtraOptions;
	}) => void | Promise<void>;
};

export type BaseConfig<
	TBaseData = unknown,
	TBaseErrorData = unknown,
	TBaseResultMode extends ResultStyleUnion = undefined,
> = Omit<FetchConfig<TBaseData, TBaseErrorData, TBaseResultMode>, "body">;

export type FetchConfig<
	TData = unknown,
	TErrorData = unknown,
	TResultMode extends ResultStyleUnion = undefined,
> = Omit<RequestInit, "method" | "body"> & ExtraOptions<TData, TErrorData, TResultMode>;

type ApiSuccessVariant<TData> = {
	dataInfo: TData;
	errorInfo: null;
	response: Response;
};

export type ApiErrorVariant<TErrorData> =
	| {
			dataInfo: null;
			errorInfo: {
				errorName: "HTTPError";
				errorData: TErrorData;
				message: string;
			};
			response: Response;
	  }
	| {
			dataInfo: null;
			errorInfo: {
				errorName: NonNullable<PossibleError["name"]>;
				message: string;
			};
			response: null;
	  };

type ResultStyleMap<TData = unknown, TErrorData = unknown> = {
	all: ApiSuccessVariant<TData> | ApiErrorVariant<TErrorData>;
	onlySuccess: TData;
	onlyError: TErrorData;
	onlyResponse: Response;
};

// == Using this double Immediately Indexed Mapped type to get a union of the keys of the object while still showing the full type signature on hover
export type ResultStyleUnion = {
	_: { [Key in keyof ResultStyleMap]: Key }[keyof ResultStyleMap] | undefined;
}["_"];

export type GetCallApiResult<TData, TErrorData, TResultMode> =
	TResultMode extends NonNullable<ResultStyleUnion>
		? ResultStyleMap<TData, TErrorData>[TResultMode]
		: ResultStyleMap<TData, TErrorData>["all"];

export type AbortSignalWithAny = typeof AbortSignal & { any: (signalArray: AbortSignal[]) => AbortSignal };

export type PossibleError = {
	name?: "AbortError" | "TimeoutError" | "SyntaxError" | "TypeError" | "Error" | "UnknownError";
	message?: string;
};
