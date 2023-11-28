export type BaseFetchConfig = Omit<RequestInit, 'method'> & {
	baseURL: string;
	method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
	timeout?: number;
	defaultErrorMessage?: string;

	requestInterceptor?: (requestConfig: RequestInit) => Promise<RequestInit> | RequestInit;

	responseInterceptor?: (response: Response) => Promise<void> | void;

	errorInterceptor?: (error: unknown) => Promise<void> | void;
};

export type FetchConfig = Omit<BaseFetchConfig, 'baseURL' | 'defaultErrorMessage'>;
