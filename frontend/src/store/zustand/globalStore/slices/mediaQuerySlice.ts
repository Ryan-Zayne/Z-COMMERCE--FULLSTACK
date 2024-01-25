import { desktopQuery, mobileQuery, tabletQuery } from "@/lib/utils/constants";
import type { StateCreator } from "zustand";
import type { MediaQuerySlice } from "../../zustand-store.types";

type StateSlice = StateCreator<MediaQuerySlice, [], [], MediaQuerySlice>;

export const createMediaQuerySlice: StateSlice = (set) => ({
	isMobile: mobileQuery.matches,
	isTablet: tabletQuery.matches,
	isDesktop: desktopQuery.matches,

	mediaQueryActions: {
		setIsMobile: () => set({ isMobile: mobileQuery.matches }),
		setIsTablet: () => set({ isTablet: tabletQuery.matches }),
		setIsDesktop: () => set({ isDesktop: desktopQuery.matches }),
	},
});
