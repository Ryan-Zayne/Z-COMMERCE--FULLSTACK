export const getResponseData = <TResponse>(response: Response) => {
	return response.json() as Promise<TResponse>;
};

export const isHTTPError = (errorName: unknown): errorName is "HTTPError" => errorName === "HTTPError";

// class HTTPError<ErrorResponseType = Record<string, unknown>> {
// 	constructor(errorDetails) {}
// }
