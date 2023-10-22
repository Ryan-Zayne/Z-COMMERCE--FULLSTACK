import type { StateCreator } from 'zustand';
import { noScrollOnOpen } from '../../../utils/no-scroll-on-open';
import type { GlobalStateSliceType } from '../zustand-store.types';

export const createGlobalStateSlice: StateCreator<GlobalStateSliceType, [], [], GlobalStateSliceType> = (
	set,
	get
) => ({
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
