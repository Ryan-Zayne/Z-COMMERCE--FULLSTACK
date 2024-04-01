import { useState, useSyncExternalStore } from "react";
import { type StorageOptions, createExternalStorageStore } from "./createExternalStorageStore";

const useStorageState = <TStorageValue>(
	key: string,
	defaultValue: TStorageValue,
	options?: StorageOptions<TStorageValue>
) => {
	const [externalStorageStore] = useState(() => createExternalStorageStore(key, defaultValue, options));

	const stateInStorage = useSyncExternalStore(
		externalStorageStore.subscribe,
		externalStorageStore.getSnapshot,
		externalStorageStore.getServerSnapshot
	);

	return [stateInStorage, externalStorageStore.setState, externalStorageStore.removeState] as const;
};

export { useStorageState };
