import { create, type StateCreator } from "zustand";
import { useShallow } from "zustand/react/shallow";
import type { GlobalStore } from "../zustand-store.types";
import { createGlobalStateSlice } from "./slices/globalStateSlice";
import { createMediaQuerySlice } from "./slices/mediaQuerySlice";

// State Object creation
const globalStoreObjectFn: StateCreator<GlobalStore> = (...params) => ({
	...createGlobalStateSlice(...params),
	...createMediaQuerySlice(...params),
});

// Store hook creation
export const useGlobalStore = create<GlobalStore>()(globalStoreObjectFn);

export const useGlobalStoreShallow = <TState>(selector: (state: GlobalStore) => TState) =>
	useGlobalStore(useShallow(selector));

// Actions hooks
export const useGlobalActions = () => useGlobalStore((state) => state.globalActions);
export const useMediaQueryActions = () => useGlobalStore((state) => state.mediaQueryActions);
