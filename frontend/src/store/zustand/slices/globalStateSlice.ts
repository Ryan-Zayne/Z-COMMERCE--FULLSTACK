import type { StateCreator } from 'zustand';
import { noScrollOnOpen } from '../../../utils/no-scroll-on-open';
import type { GlobalStateSlice } from '../zustand-store.types';

export const createGlobalStateSlice: StateCreator<GlobalStateSlice, [], [], GlobalStateSlice> = (
	set,
	get
) => ({
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
