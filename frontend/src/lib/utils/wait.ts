const wait = (delay: number) => {
	const { promise, resolve } = Promise.withResolvers();

	if (delay === 0) return;

	setTimeout(resolve, delay);

	return promise;
};

export { wait };
