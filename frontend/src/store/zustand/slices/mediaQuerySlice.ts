import { desktopQuery, mobileQuery, tabletQuery } from '@/utils/constants';
import type { StateCreator } from 'zustand';
import type { MediaQuerySliceType } from '../zustand-store.types';

export const createMediaQuerySlice: StateCreator<MediaQuerySliceType, [], [], MediaQuerySliceType> = (
	set
) => ({
	isMobile: mobileQuery.matches,
	isTablet: tabletQuery.matches,
	isDesktop: desktopQuery.matches,

	mediaQueryActions: {
		setIsMobile: () => set({ isMobile: mobileQuery.matches }),
		setIsTablet: () => set({ isTablet: tabletQuery.matches }),
		setIsDesktop: () => set({ isDesktop: desktopQuery.matches }),
	},
});
