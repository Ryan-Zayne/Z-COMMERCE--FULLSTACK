import { createCustomContext, useConstant } from "@zayne-labs/toolkit/react";
import type { SelectorFn } from "@zayne-labs/toolkit/type-helpers";
import { useEffect } from "react";
import { create } from "zustand";
import type { DrawerProviderProps, DrawerStore } from "./drawer.types";

const [Provider, useCustomDrawerContext] = createCustomContext<ReturnType<typeof createDrawerStore>>({
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

	// == DrawerStore is stable between renders, so no need for memoization before passing to the provider
	return <Provider value={useInitDrawerStore}>{children}</Provider>;
}

// Store Hook
// prettier-ignore
// eslint-disable-next-line react-refresh/only-export-components
export const useDrawerStore = <TResult,>(selector: SelectorFn<DrawerStore, TResult>) => useCustomDrawerContext()(selector)
