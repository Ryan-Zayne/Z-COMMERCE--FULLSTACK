type DispatchOptionsType = StorageEventInit & { eventFn: () => void };

const dispatchStorageEvent = (dispatchOptions: DispatchOptionsType) => {
	const { eventFn, key: storedValueKey, ...restOfOptions } = dispatchOptions;

	eventFn();

	window.dispatchEvent(
		new StorageEvent('storage', {
			key: storedValueKey,
			...restOfOptions,
		})
	);
};

export { dispatchStorageEvent };
