import type { SelectorFn } from "@/lib/type-helpers/global";
import { type StorageOptions, createExternalStorageStore } from "../core/createExternalStorageStore";
import { useConstant } from "./useConstant";
import { useStore } from "./useStore";

const useStorageState = <TValue, TSlice = TValue>(
	key: string,
	defaultValue: TValue,
	options: StorageOptions<TValue> & { select?: SelectorFn<TValue, TSlice> } = {}
) => {
	const { select = (value: never) => value, ...restOfOptions } = options;

	const externalStore = useConstant(() => createExternalStorageStore(key, defaultValue, restOfOptions));

	const stateInStorage = useStore(externalStore as never, select);

	return [stateInStorage, externalStore.setState, externalStore.removeState] as const;
};

export { useStorageState };
