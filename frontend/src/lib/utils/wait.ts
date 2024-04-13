const wait = (delay: number) => {
	const { promise, resolve } = Promise.withResolvers();

	setTimeout(resolve, delay);

	return promise;
};

export { wait };
