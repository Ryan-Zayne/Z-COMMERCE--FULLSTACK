import { createCustomContext, useDisclosure } from "@zayne-labs/toolkit-react";
import type { DrawerStore } from "./types";

export const [DrawerContextProvider, useDrawerContext] = createCustomContext<DrawerStore>({
	hookName: "useDrawerContext",
	name: "DrawerContext",
	providerName: "DrawerContextProvider",
});

export const useDrawer = () => useDisclosure({ hasScrollControl: true });
