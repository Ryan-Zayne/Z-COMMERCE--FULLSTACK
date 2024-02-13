type DispatchOptionsType = StorageEventInit & { eventCallback: () => void };

const dispatchStorageEvent = (dispatchOptions: DispatchOptionsType) => {
	const {
		eventCallback,
		key: storedValueKey,
		storageArea = window.localStorage,
		url = window.location.href,
		...restOfOptions
	} = dispatchOptions;

	eventCallback();

	window.dispatchEvent(
		new StorageEvent("storage", {
			key: storedValueKey,
			storageArea,
			url,
			...restOfOptions,
		})
	);
};

export { dispatchStorageEvent };
