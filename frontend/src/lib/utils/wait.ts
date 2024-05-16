export const wait = (delay: number) => {
	if (delay === 0) return;

	const { promise, resolve } = Promise.withResolvers();

	setTimeout(resolve, delay);

	return promise;
};

export const waitSync = (delay: number) => {
	if (delay === 0) return;

	const startTime = Date.now();

	let currentTime = startTime;

	const elapsedTime = currentTime - startTime;

	while (elapsedTime < delay) {
		currentTime = Date.now();
	}
};
