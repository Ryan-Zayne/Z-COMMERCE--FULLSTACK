export class ContextError extends Error {
	constructor(message: string) {
		super(message);

		this.name = 'ContextError';
	}
}

export const getErrorMessage = (hook: string, provider: string) => {
	return `${hook} returned "undefined". Seems you forgot to wrap component within ${provider}`;
};
