export const wait = (delay: number) => {
	if (delay === 0) return;

	const { promise, resolve } = Promise.withResolvers();

	setTimeout(resolve, delay);

	return promise;
};

export const waitSync = (delay: number) => {
	if (delay === 0) return;

	const startTime = performance.now();

	let currentTime = startTime;

	const elapsedTime = Math.floor(currentTime - startTime);

	while (elapsedTime < delay) {
		currentTime = performance.now();
	}
};
