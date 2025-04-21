/* eslint-disable react-refresh/only-export-components */
import { useConstant, useDisclosure } from "@zayne-labs/toolkit-react";
import { createZustandContext } from "@zayne-labs/toolkit-react/zustand";
import { useEffect } from "react";
import { create } from "zustand";
import type { DrawerRootProviderProps, DrawerStore } from "./types";

const [DrawerProvider, useDrawerStore] = createZustandContext<DrawerStore>({
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

export function DrawerContextProvider({ children, value }: DrawerRootProviderProps) {
	const useInitDrawerStore = useConstant(() => createDrawerStore(value));

	useEffect(() => {
		useInitDrawerStore.setState({ isOpen: value.isOpen });

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value.isOpen]);

	return <DrawerProvider value={useInitDrawerStore}>{children}</DrawerProvider>;
}

export const useDrawer = () => useDisclosure({ hasScrollControl: true });

export { useDrawerStore };
