export type BaseFetchConfig = {
	baseURL: string;

	method?: "GET" | "POST" | "PATCH" | "DELETE";

	timeout?: number;

	defaultErrorMessage?: string;

	interceptors?: {
		onRequest?: (requestConfig: RequestInit) => Promise<RequestInit> | RequestInit;

		onRequestError?: (requestConfig: RequestInit) => Promise<RequestInit> | RequestInit;

		onResponse?: (response: Response) => Promise<void> | void;

		onResponseError?: (response: Response) => Promise<void> | void;
	};
} & Omit<RequestInit, "method" | "body">;

export type FetchConfig = {
	body?: string | Record<string, unknown> | FormData;
} & Omit<BaseFetchConfig, "baseURL" | "defaultErrorMessage">;

export type DefaultErrorType = {
	status: "error";
	message: string;
};

export type ApiResponseData<TData, TError = DefaultErrorType> =
	| {
			dataInfo: TData;
			errorInfo: null;
	  }
	| {
			dataInfo: null;
			errorInfo: TError;
	  };
