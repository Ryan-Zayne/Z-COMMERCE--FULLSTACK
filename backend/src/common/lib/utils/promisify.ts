export const PromiseWithResolvers = () => {
	let resolve, reject;

	const promise = new Promise((res, rej) => {
		resolve = res;
		reject = rej;
	});

	return { promise, resolve, reject };
};

// prettier-ignore
export const promisify = (callbackBasedFn) => (...params) => {
		const { promise, resolve, reject } = Promise.withResolvers();

		callbackBasedFn(...params, (err, data) => {
			if (err) {
				reject(err);
				return;
			}

			resolve(data);
		});

		return promise;
	};
