import { createCustomContext } from "@/lib/hooks/custom-context-hook";
import { useEffect, useState } from "react";
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

const createDrawerStore = () => {
	const drawerStore = createStore<DrawerStore>(() => defaultStoreValues);

	return drawerStore;
};

function DrawerContextProvider({ children, storeValues }: DrawerProviderProps) {
	const [drawerStore] = useState(() => createDrawerStore());

	useEffect(
		function updateStoreEffect() {
			drawerStore.setState(storeValues);
		},

		// eslint-disable-next-line react-hooks/exhaustive-deps
		[storeValues]
	);

	// == DrawerStore is stable between renders, so no need for memoization before passing to the provider
	return <Provider value={drawerStore}>{children}</Provider>;
}

export { DrawerContextProvider, useCustomDrawerContext };
