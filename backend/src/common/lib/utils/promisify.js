const PromiseWithResolvers = () => {
	let resolve;
	let reject;

	const promise = new Promise((res, rej) => {
		resolve = res;
		reject = rej;
	});

	return { promise, resolve, reject };
};

// prettier-ignore
const promisify = (callbackBasedFn) => (...params) => {
		const { promise, resolve, reject } = PromiseWithResolvers();

		callbackBasedFn(...params, (err, data) => {
			if (err) {
				reject(err);
				return;
			}

			resolve(data);
		});

		return promise;
	};

export { promisify };
