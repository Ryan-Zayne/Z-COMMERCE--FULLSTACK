import { useStore } from "zustand";
import type { DrawerStore } from "../drawer.types";
import { useCustomDrawerContext } from "../drawerStoreContext.tsx";

const useDrawerStore = <TSlice>(selector: (state: DrawerStore) => TSlice) => {
	const store = useCustomDrawerContext();

	return useStore(store, selector);
};

export { useDrawerStore };
