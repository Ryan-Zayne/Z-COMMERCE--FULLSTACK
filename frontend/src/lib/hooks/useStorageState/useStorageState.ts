import type { SelectorFn } from "@/lib/type-helpers/global-type-helpers";
import { useSyncExternalStore } from "react";
import { useConstant } from "../useConstant";
import { type StorageOptions, createExternalStorageStore } from "./createExternalStorageStore";

const useStorageState = <TValue, TSlice>(
	key: string,
	defaultValue: TValue,
	options?: StorageOptions<TValue> & { select: SelectorFn<TValue, TSlice> }
) => {
	const { select = (store: TValue) => store as unknown as TSlice, ...restOfOptions } = options ?? {};

	const externalStore = useConstant(() => createExternalStorageStore(key, defaultValue, restOfOptions));

	const stateInStorage = useSyncExternalStore(
		externalStore.subscribe,
		() => select(externalStore.getSnapshot()),
		() => select(externalStore.getServerSnapshot())
	);

	return [stateInStorage, externalStore.setState, externalStore.removeState] as const;
};

export { useStorageState };
