export const getResponseData = async <TResponse>(response: Response) => {
	const isJson = response.headers.get('content-type')?.includes('application/json');

	return isJson ? (response.json() as TResponse) : ({ message: await response.text() } as TResponse);
};

export class HTTPError<ErrorResponseType = Record<string, unknown>> extends Error {
	response: ErrorResponseType;

	constructor(errorDetails: { defaultErrorMessage: string; responseData: ErrorResponseType }) {
		const { defaultErrorMessage, responseData } = errorDetails;

		super((responseData as { message?: string }).message ?? defaultErrorMessage);

		this.name = 'HTTPError';

		this.response = responseData;
	}
}
