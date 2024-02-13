import { type StateCreator, create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import type { GlobalStore, SelectorFn } from "../zustand-store.types";
import { createGlobalStateSlice } from "./slices/globalStateSlice";
import { createMediaQuerySlice } from "./slices/mediaQuerySlice";

// State Object creation
const globalStoreObjectFn: StateCreator<GlobalStore> = (...params) => ({
	...createGlobalStateSlice(...params),
	...createMediaQuerySlice(...params),
});

// Store hook creation
export const useGlobalStore = create<GlobalStore>()(globalStoreObjectFn);

export const useGlobalStoreShallow = <TResult>(selector: SelectorFn<GlobalStore, TResult>) =>
	useGlobalStore(useShallow(selector));

// Actions hooks
export const useGlobalActions = () => useGlobalStore((state) => state.globalActions);
