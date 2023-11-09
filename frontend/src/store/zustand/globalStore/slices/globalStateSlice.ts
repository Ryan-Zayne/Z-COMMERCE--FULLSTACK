import type { StateCreator } from 'zustand';
import { noScrollOnOpen } from '../../../../lib/utils/no-scroll-on-open';
import type { GlobalStateSlice } from '../../zustand-store.types';

type StateSlice = StateCreator<GlobalStateSlice, [], [], GlobalStateSlice>;

export const createGlobalStateSlice: StateSlice = (set, get) => ({
	isNavShow: false,
	isSearchShow: false,
	isImageLoaded: false,

	globalActions: {
		toggleNavShow: () => {
			set((state) => ({ isNavShow: !state.isNavShow }));
			noScrollOnOpen({ isOpen: get().isNavShow });
		},

		toggleSearchShow: () => set((state) => ({ isSearchShow: !state.isSearchShow })),

		handleImageLoad: () => set({ isImageLoaded: true }),
	},
});
