import { noScrollOnOpen } from '@/utils/no-scroll-on-open';
import type { StateCreator } from 'zustand';
import type { GlobalStateSlice } from '../../zustand-store.types';

type StateSlice = StateCreator<GlobalStateSlice, [], [], GlobalStateSlice>;

export const createGlobalStateSlice: StateSlice = (set, get) => ({
	isNavShow: false,
	isSearchShow: false,

	globalActions: {
		toggleNavShow: () => {
			set((state) => ({ isNavShow: !state.isNavShow }));
			noScrollOnOpen({ isOpen: get().isNavShow });
		},

		toggleSearchShow: () => set((state) => ({ isSearchShow: !state.isSearchShow })),
	},
});
