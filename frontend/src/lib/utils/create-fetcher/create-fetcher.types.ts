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

export type FetchConfig = Omit<BaseFetchConfig, "baseURL" | "defaultErrorMessage"> &
	Pick<RequestInit, "body">;

export type ApiResponseData<TData, TError = { status: "error"; message: string }> =
	| {
			dataInfo: TData;
			errorInfo: null;
	  }
	| {
			dataInfo: null;
			errorInfo: TError;
	  };

export type DefaultErrorType = {
	status: "error";
	message: string;
};
