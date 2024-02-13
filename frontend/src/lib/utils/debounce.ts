const debounce = <TParams>(callBackFn: (...params: TParams[]) => void, delay: number) => {
	let timer: number | null = null;

	const debouncedFn = (...params: TParams[]) => {
		timer && window.clearTimeout(timer);

		timer = window.setTimeout(() => {
			callBackFn(...params);
			timer = null;
		}, delay);
	};

	return debouncedFn;
};

export { debounce };
