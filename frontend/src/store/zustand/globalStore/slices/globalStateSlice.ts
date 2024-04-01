import { noScrollOnOpen } from "@/lib/utils/no-scroll-on-open";
import type { StateCreator } from "zustand";
import type { GlobalStateSlice } from "../../zustand-store.types";

type StateSlice = StateCreator<GlobalStateSlice, [], [], GlobalStateSlice>;

export const createGlobalStateSlice: StateSlice = (set, get) => ({
	isNavShow: false,

	globalActions: {
		toggleNavShow: () => {
			set((state) => ({ isNavShow: !state.isNavShow }));
			noScrollOnOpen({ isActive: get().isNavShow });
		},
	},
});
