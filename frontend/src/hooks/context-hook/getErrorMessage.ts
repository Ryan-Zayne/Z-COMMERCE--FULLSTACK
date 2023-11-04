const getErrorMessage = (hook: string, provider: string) => {
	return `${hook} returned "undefined". Seems you forgot to wrap component within ${provider}`;
};

export { getErrorMessage };
