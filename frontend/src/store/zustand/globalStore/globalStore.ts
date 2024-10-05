import type { SelectorFn } from "@zayne-labs/toolkit/type-helpers";
import { type StateCreator, create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import type { GlobalStore } from "../zustand-store.types";
import { createCommonStateSlice } from "./slices/commonStateSlice";
import { createMediaQuerySlice } from "./slices/mediaQuerySlice";

// State Object creation
const globalStoreObjectFn: StateCreator<GlobalStore> = (...params) => ({
	...createCommonStateSlice(...params),
	...createMediaQuerySlice(...params),

	actions: {
		...createCommonStateSlice(...params).actions,
		...createMediaQuerySlice(...params).actions,
	},
});

// Store hook creation
export const useGlobalStore = create<GlobalStore>()(globalStoreObjectFn);

export const useGlobalStoreShallow = <TResult>(selector: SelectorFn<GlobalStore, TResult>) =>
	useGlobalStore(useShallow(selector));

// Actions hooks
