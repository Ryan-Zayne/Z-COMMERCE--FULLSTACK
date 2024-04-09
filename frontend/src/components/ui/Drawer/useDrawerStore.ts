import type { SelectorFn } from "@/lib/type-helpers/global-type-helpers";
import { useStore } from "zustand";
import type { DrawerStore } from "./drawer.types";
import { useCustomDrawerContext } from "./drawerStoreContext";

const useDrawerStore = <TResult>(selector: SelectorFn<DrawerStore, TResult>) => {
	const store = useCustomDrawerContext();

	return useStore(store, selector);
};

export { useDrawerStore };
