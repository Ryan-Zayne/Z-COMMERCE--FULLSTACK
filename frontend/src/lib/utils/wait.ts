
export const waitUntil = (delay: number) => {
	if (delay === 0) return;

	const { promise, resolve } = Promise.withResolvers();

	setTimeout(resolve, delay);

	return promise;
};

export const waitUntilSync = (delay: number) => {
	if (delay === 0) return;

	const startTime = performance.now();

	let currentTime = startTime;

	while (Math.floor(currentTime - startTime) < delay) {
		currentTime = performance.now();
	}
};
