import { desktopQuery, mobileQuery, tabletQuery } from "@/lib/utils/constants";
import { on } from "@zayne-labs/toolkit";
import type { StateCreator } from "zustand";
import type { GlobalStore, MediaQuerySlice } from "../../types";

export const MEDIA_QUERY_LOOKUP = {
	desktop: {
		queryKey: "isDesktop",
		queryList: desktopQuery,
	} as const,

	mobile: {
		queryKey: "isMobile",
		queryList: mobileQuery,
	} as const,

	tablet: {
		queryKey: "isTablet",
		queryList: tabletQuery,
	} as const,
};

export const createMediaQuerySlice: StateCreator<GlobalStore, [], [], MediaQuerySlice> = (set, get) => ({
	actions: {
		handleQueryListeners: (action) => {
			const { setQuery } = get().actions;
			const { desktop, mobile, tablet } = MEDIA_QUERY_LOOKUP;

			const controller = new AbortController();

			if (action === "remove") {
				controller.abort();
				return;
			}

			on("change", mobile.queryList, setQuery("mobile"), { signal: controller.signal });
			on("change", tablet.queryList, setQuery("tablet"), { signal: controller.signal });
			on("change", desktop.queryList, setQuery("desktop"), { signal: controller.signal });
		},

		setQuery: (query) => () => {
			const { queryKey, queryList } = MEDIA_QUERY_LOOKUP[query];

			set({ [queryKey]: queryList.matches });
		},
	},
	isDesktop: MEDIA_QUERY_LOOKUP.desktop.queryList.matches,
	isMobile: MEDIA_QUERY_LOOKUP.mobile.queryList.matches,

	isTablet: MEDIA_QUERY_LOOKUP.tablet.queryList.matches,
});
