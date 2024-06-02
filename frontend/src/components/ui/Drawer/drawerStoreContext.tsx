import { createCustomContext, useConstant } from "@/lib/hooks";
import type { SelectorFn } from "@/lib/type-helpers/global-type-helpers";
import { useEffect } from "react";
import { create } from "zustand";
import type { DrawerProviderProps, DrawerStore } from "./drawer.types";

const [Provider, useCustomDrawerContext] = createCustomContext<ReturnType<typeof createDrawerStore>>({
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

const createDrawerStore = (storeValues = defaultStoreValues) => create<DrawerStore>()(() => storeValues);

export function DrawerContextProvider({ children, storeValues }: DrawerProviderProps) {
	const useInitDrawerStore = useConstant(() => createDrawerStore(storeValues));

	useEffect(() => {
		useInitDrawerStore.setState({ isOpen: storeValues.isOpen });

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [storeValues.isOpen]);

	// == DrawerStore is stable between renders, so no need for memoization before passing to the provider
	return <Provider value={useInitDrawerStore}>{children}</Provider>;
}

// prettier-ignore
// Store Hook
export const useDrawerStore = <TResult,>(selector: SelectorFn<DrawerStore, TResult>) => useCustomDrawerContext()(selector)
