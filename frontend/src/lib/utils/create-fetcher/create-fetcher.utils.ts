export const getResponseData = async <TResponse>(response: Response) => {
	return (await response.json()) as TResponse;
};

export class HTTPError<ErrorResponseType = Record<string, unknown>> extends Error {
	response: ErrorResponseType;

	constructor(errorDetails: { defaultErrorMessage: string; responseData: ErrorResponseType }) {
		const { defaultErrorMessage, responseData } = errorDetails;

		super((responseData as Error).message ?? defaultErrorMessage);

		this.name = 'HTTPError';

		this.response = responseData;
	}
}
