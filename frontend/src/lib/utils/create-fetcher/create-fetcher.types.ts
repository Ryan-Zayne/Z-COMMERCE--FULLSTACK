export type BaseFetchConfig = Omit<RequestInit, 'method'> & {
	baseURL: string;

	method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';

	timeout?: number;

	defaultErrorMessage?: string;

	interceptors?: {
		requestInterceptor?: (requestConfig: RequestInit) => Promise<RequestInit> | RequestInit;

		responseInterceptor?: (response: Response) => Promise<void> | void;

		errorInterceptor?: (error: unknown) => Promise<void> | void;
	};
};

export type FetchConfig = Omit<BaseFetchConfig, 'baseURL' | 'defaultErrorMessage'>;

export type ApiResponseData<TData, TError = { status: 'error'; message: string }> =
	| {
			dataInfo: TData;
			errorInfo: null;
	  }
	| {
			dataInfo: null;
			errorInfo: TError;
	  };
