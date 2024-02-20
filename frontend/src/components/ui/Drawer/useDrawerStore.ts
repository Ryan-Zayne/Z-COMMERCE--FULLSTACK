import type { SelectorFn } from "@/store/zustand/zustand-store.types";
import { useStore } from "zustand";
import type { DrawerStore } from "./drawer.types";
import { useCustomDrawerContext } from "./drawerStoreContext";

const useDrawerStore = <TResult>(selector: SelectorFn<DrawerStore, TResult>) => {
	const store = useCustomDrawerContext();

	return useStore(store, selector);
};

export { useDrawerStore };
