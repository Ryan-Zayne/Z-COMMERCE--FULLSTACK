// prettier-ignore

const promisify = (callbackBasedFn) => (...params) => {
	const promise = new Promise((resolve, reject) => {
		callbackBasedFn(...params, (err, data) => {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});

	return promise;
};

export { promisify };
