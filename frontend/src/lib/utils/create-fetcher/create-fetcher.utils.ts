export const getResponseData = async <TResponse>(response: Response) => {
	const isJson = response.headers.get("content-type")?.includes("application/json");

	return isJson ? (response.json() as TResponse) : ({ message: await response.text() } as TResponse);
};

type ErrorDetails<ErrorResponseType> = {
	response: ErrorResponseType;
	defaultErrorMessage: string;
};

export class HTTPError<ErrorResponseType = Record<string, unknown>> extends Error {
	response: ErrorResponseType;

	constructor(errorDetails: ErrorDetails<ErrorResponseType>) {
		const { defaultErrorMessage, response } = errorDetails;

		super((response as { message?: string }).message ?? defaultErrorMessage);

		this.name = "HTTPError";

		this.response = response;
	}
}
