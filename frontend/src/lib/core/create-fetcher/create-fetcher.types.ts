import type { AnyNumber, AnyString } from "@/lib/type-helpers/global-type-helpers";
import type {
	HTTPError,
	createResponseLookup,
	omitFetchConfig,
	pickFetchConfig,
} from "./create-fetcher.utils";

export type ExtraOptions<
	TBaseData = unknown,
	TBaseErrorData = unknown,
	TBaseResultStyle extends ResultStyleUnion = ResultStyleUnion,
> = {
	body?: Record<string, unknown> | RequestInit["body"];

	method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE" | AnyString;

	query?: Record<string, string>;

	bodySerializer?: <TData>(bodyData: TData) => string;

	responseParser?: <TData>(responseData: string) => TData;

	resultStyle?: TBaseResultStyle;

	baseURL?: string;

	timeout?: number;

	defaultErrorMessage?: string;

	throwOnError?: boolean | ((error?: Error | HTTPError<TBaseErrorData>) => boolean);

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

		onResponseError?: <TErrorData = TBaseErrorData>(errorContext: {
			response: Response & { errorData: TErrorData };
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
	TBaseErrorData = unknown,
	TBaseResultStyle extends ResultStyleUnion = undefined,
> = Omit<RequestInit, "method" | "body"> & ExtraOptions<TBaseData, TBaseErrorData, TBaseResultStyle>;

export type FetchConfig<TData, TErrorData, TResultStyle extends ResultStyleUnion> = BaseConfig<
	TData,
	TErrorData,
	TResultStyle
>;

type ApiSuccessShape<TData> = {
	dataInfo: TData;
	errorInfo: null;
	response: Response;
};

export type ApiErrorShape<TErrorData> =
	| {
			dataInfo: null;
			errorInfo: {
				errorName: "HTTPError";
				message: string;
				response: TErrorData;
			};
			response: Response;
	  }
	| {
			dataInfo: null;
			errorInfo: {
				errorName: Required<PossibleError>["name"];
				message: string;
			};
			response: null;
	  };

type ResultStyleMap<TData = unknown, TErrorData = unknown> = {
	all: ApiSuccessShape<TData> | ApiErrorShape<TErrorData>;
	onlySuccess: TData;
	onlyError: TErrorData;
	onlyResponse: Response;
};

// == Using this double Immediately Indexed Mapped type to get a union of the keys of the object while still showing the full type signature on hover
export type ResultStyleUnion = {
	_: { [Key in keyof ResultStyleMap]: Key }[keyof ResultStyleMap] | undefined;
}["_"];

export type GetCallApiResult<TData, TErrorData, TResultStyle> =
	TResultStyle extends NonNullable<ResultStyleUnion>
		? ResultStyleMap<TData, TErrorData>[TResultStyle]
		: ResultStyleMap<TData, TErrorData>["all"];

export type AbortSignalWithAny = typeof AbortSignal & { any: (signalArray: AbortSignal[]) => AbortSignal };

export type PossibleError = {
	name?: "AbortError" | "TimeoutError" | "SyntaxError" | "TypeError" | "Error" | "UnknownError";
	message?: string;
};
