import type { SelectorFn } from "@/lib/type-helpers/global-type-helpers";
import { createDefaultSelector } from "../core/createDefaultSelector";
import { type StorageOptions, createExternalStorageStore } from "../core/createExternalStorageStore";
import type { StoreApi } from "../core/createStore";
import { useConstant } from "./useConstant";
import { useStore } from "./useStore";

const useStorageState = <TValue, TSlice = TValue>(
	key: string,
	defaultValue: TValue,
	options?: StorageOptions<TValue> & { select: SelectorFn<TValue, TSlice> }
) => {
	const { select = createDefaultSelector<TValue, TSlice>(), ...restOfOptions } = options ?? {};

	const externalStore = useConstant(() => createExternalStorageStore(key, defaultValue, restOfOptions));

	const stateInStorage = useStore(externalStore as StoreApi<TValue>, select);

	return [stateInStorage, externalStore.setState, externalStore.removeState] as const;
};

export { useStorageState };
