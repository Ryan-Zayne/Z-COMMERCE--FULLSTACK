export const getResponseData = async <TResponse>(response: Response) => {
	const isJson = response.headers.get("content-type")?.includes("application/json");

	return isJson ? (response.json() as TResponse) : ({ message: await response.text() } as TResponse);
};

export const isHTTPError = (errorName: unknown): errorName is "HTTPError" => errorName === "HTTPError";

// class HTTPError<ErrorResponseType = Record<string, unknown>> {
// 	constructor(errorDetails) {}
// }
