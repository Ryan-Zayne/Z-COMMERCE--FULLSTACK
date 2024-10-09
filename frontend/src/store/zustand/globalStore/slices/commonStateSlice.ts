import { noScrollOnOpen } from "@/lib/utils/no-scroll-on-open";
import type { StateCreator } from "zustand";
import type { CommonStateSlice, GlobalStore } from "../../zustand-store.types";

export const createCommonStateSlice: StateCreator<GlobalStore, [], [], CommonStateSlice> = (set, get) => ({
	actions: {
		toggleNavShow: () => {
			set((state) => ({ isNavShow: !state.isNavShow }));
			noScrollOnOpen({ isActive: get().isNavShow });
		},
	},

	isNavShow: false,
});
