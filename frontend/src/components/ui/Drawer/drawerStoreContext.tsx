import { createZustandContext, useConstant } from "@zayne-labs/toolkit/react";
import { useEffect } from "react";
import { create } from "zustand";
import type { DrawerProviderProps, DrawerStore } from "./drawer.types";

const [Provider, useDrawerStore] = createZustandContext<DrawerStore>({
	hookName: "useDrawerStore",
	name: "DrawerStoreContext",
	providerName: "DrawerContextProvider",
});

const defaultStoreValues: DrawerStore = {
	isOpen: false,
	onClose: () => {},
	onOpen: () => {},
	onToggle: () => {},
};

const createDrawerStore = (storeValues = defaultStoreValues) => create(() => storeValues);

export function DrawerContextProvider({ children, storeValues }: DrawerProviderProps) {
	const useInitDrawerStore = useConstant(() => createDrawerStore(storeValues));

	useEffect(() => {
		useInitDrawerStore.setState({ isOpen: storeValues.isOpen });

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [storeValues.isOpen]);

	return <Provider value={useInitDrawerStore}>{children}</Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export { useDrawerStore };
