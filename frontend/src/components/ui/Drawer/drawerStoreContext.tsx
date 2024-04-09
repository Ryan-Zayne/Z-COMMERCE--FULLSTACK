import { useInitialize } from "@/lib/hooks";
import { createCustomContext } from "@/lib/hooks/custom-context-hook";
import { useEffect } from "react";
import { createStore } from "zustand";
import type { DrawerProviderProps, DrawerStore, DrawerStoreApi } from "./drawer.types";

const [Provider, useCustomDrawerContext] = createCustomContext<DrawerStoreApi>({
	name: "DrawerStoreContext",
	hookName: "useDrawerStore",
	providerName: "DrawerContextProvider",
});

const defaultStoreValues: DrawerStore = {
	isOpen: false,
	onOpen: () => {},
	onClose: () => {},
	onToggle: () => {},
};

const createDrawerStore = (storeValues = defaultStoreValues) => {
	const drawerStore = createStore<DrawerStore>(() => storeValues);

	return drawerStore;
};

function DrawerContextProvider({ children, storeValues }: DrawerProviderProps) {
	const drawerStore = useInitialize(() => createDrawerStore(storeValues));

	useEffect(() => {
		drawerStore.setState({ isOpen: storeValues.isOpen });

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [storeValues.isOpen]);

	// == DrawerStore is stable between renders, so no need for memoization before passing to the provider
	return <Provider value={drawerStore}>{children}</Provider>;
}

export { DrawerContextProvider, useCustomDrawerContext };
