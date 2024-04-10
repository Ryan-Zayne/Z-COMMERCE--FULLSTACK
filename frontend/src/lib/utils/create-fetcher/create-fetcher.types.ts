export type BaseFetchConfig<TData, TError> = {
	baseURL: string;

	method?: "GET" | "POST" | "PATCH" | "DELETE";

	timeout?: number;

	defaultErrorMessage?: string;

	interceptors?: {
		onRequest?: (requestConfig: RequestInit) => Promise<RequestInit> | RequestInit;

		onRequestError?: (requestConfig: RequestInit) => Promise<RequestInit> | RequestInit;

		onResponse?: (successResponse: Response & { response: TData }) => Promise<void> | void;

		onResponseError?: (errorResponse: Response & { response: TError }) => Promise<void> | void;
	};

	retries?: number;
} & Omit<RequestInit, "method" | "body">;

export type FetchConfig<TData, TError> = Omit<
	BaseFetchConfig<TData, TError>,
	"baseURL" | "defaultErrorMessage"
> & {
	body?: Record<string, unknown> | FormData | string;
};

export type ApiResponseData<TData, TError> =
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
						errorName: Exclude<PossibleErrorType["name"], undefined>;
						message: string;
				  };
	  };

export type PossibleErrorType = {
	name?: "AbortError" | "SyntaxError" | "TypeError" | "Error" | "UnknownError";
	message?: string;
};
