export const PromiseWithResolvers = <TPromise>() => {
	let resolve!: (value: TPromise) => void, reject!: (reason?: unknown) => void;

	const promise = new Promise<TPromise>((res, rej) => {
		resolve = res;
		reject = rej;
	});

	return { promise, resolve, reject };
};

export const waitUntil = (delay: number) => {
	if (delay === 0) return;

	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	const { promise, resolve } = Promise?.withResolvers() ?? PromiseWithResolvers();

	setTimeout(resolve, delay);

	return promise;
};

export const waitUntilSync = (delay: number) => {
	if (delay === 0) return;

	const startTime = performance.now();

	for (
		let currentTime = startTime;
		Math.floor(currentTime - startTime) < delay;
		currentTime = performance.now()
	) {
		// Do Nothing in the loop
	}
};
