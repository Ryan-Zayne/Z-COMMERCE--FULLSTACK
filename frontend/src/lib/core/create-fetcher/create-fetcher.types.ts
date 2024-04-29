import type { AnyNumber, AnyString } from "@/lib/type-helpers/global-type-helpers";
import type {
	HTTPError,
	createResponseLookup,
	omitFetchConfig,
	pickFetchConfig,
} from "./create-fetcher.utils";

export type ExtraOptions<
	TBaseData = unknown,
	TBaseError = unknown,
	TBaseResultStyle extends ResultStyleUnion = undefined,
> = {
	body?: Record<string, unknown> | RequestInit["body"];

	method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE" | AnyString;

	resultStyle?: TBaseResultStyle;

	query?: Record<string, string>;

	bodySerializer?: <TData>(bodyData: TData) => string;

	responseParser?: <TData>(responseData: string) => TData;

	baseURL?: string;

	timeout?: number;

	defaultErrorMessage?: string;

	throwOnError?: boolean | ((error?: Error | HTTPError<TBaseError>) => boolean);

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

export type BaseConfig<
	TBaseData = unknown,
	TBaseError = unknown,
	TBaseResultStyle extends ResultStyleUnion = undefined,
> = Omit<RequestInit, "method" | "body"> & ExtraOptions<TBaseData, TBaseError, TBaseResultStyle>;

export type FetchConfig<TData, TError, TResultStyle extends ResultStyleUnion> = BaseConfig<
	TData,
	TError,
	TResultStyle
>;

type ApiSuccessShape<TData> = {
	dataInfo: TData;
	errorInfo: null;
	response: Response;
};

export type ApiErrorShape<TError> =
	| {
			dataInfo: null;
			errorInfo: {
				errorName: "HTTPError";
				message: string;
				response: TError;
			};
			response: Response;
	  }
	| {
			dataInfo: null;
			errorInfo: {
				errorName: Required<PossibleErrorType>["name"];
				message: string;
			};
			response: null;
	  };

type ResultStyleMap<TData = unknown, TError = unknown> = {
	all: ApiSuccessShape<TData> | ApiErrorShape<TError>;
	onlySuccess: TData;
	onlyError: TError;
	onlyResponse: Response;
};

// == Using this double Immediately Indexed Mapped type to get a union of the keys of the object while still showing the full type signature on hover
export type ResultStyleUnion = {
	_: { [Key in keyof ResultStyleMap]: Key }[keyof ResultStyleMap] | undefined;
}["_"];

export type GetCallApiResult<TData, TError, TResultStyle> =
	TResultStyle extends NonNullable<ResultStyleUnion>
		? ResultStyleMap<TData, TError>[TResultStyle]
		: ResultStyleMap<TData, TError>["all"];

export type AbortSignalWithAny = typeof AbortSignal & { any: (signalArray: AbortSignal[]) => AbortSignal };

export type PossibleErrorType = {
	name?: "AbortError" | "TimeoutError" | "SyntaxError" | "TypeError" | "Error" | "UnknownError";
	message?: string;
};
