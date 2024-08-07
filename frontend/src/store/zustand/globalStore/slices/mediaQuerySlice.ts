import { desktopQuery, mobileQuery, tabletQuery } from "@/lib/utils/constants";
import { on } from "@/lib/utils/on";
import type { StateCreator } from "zustand";
import type { MediaQuerySlice } from "../../zustand-store.types";

type StateSlice<TSlice> = StateCreator<TSlice, [], [], TSlice>;

export const MEDIA_QUERY_LOOKUP = {
	mobile: {
		queryKey: "isMobile",
		queryList: mobileQuery,
	} as const,

	tablet: {
		queryKey: "isTablet",
		queryList: tabletQuery,
	} as const,

	desktop: {
		queryKey: "isDesktop",
		queryList: desktopQuery,
	} as const,
};

export const createMediaQuerySlice: StateSlice<MediaQuerySlice> = (set, get) => ({
	isMobile: MEDIA_QUERY_LOOKUP.mobile.queryList.matches,
	isTablet: MEDIA_QUERY_LOOKUP.tablet.queryList.matches,
	isDesktop: MEDIA_QUERY_LOOKUP.desktop.queryList.matches,

	mediaQueryActions: {
		setQuery: (query) => () => {
			const { queryKey, queryList } = MEDIA_QUERY_LOOKUP[query];

			set({ [queryKey]: queryList.matches });
		},

		handleQueryListeners: (action) => {
			const { setQuery } = get().mediaQueryActions;
			const { mobile, tablet, desktop } = MEDIA_QUERY_LOOKUP;

			const controller = new AbortController();

			if (action === "remove") {
				controller.abort();
				return;
			}

			on("change", mobile.queryList, setQuery("mobile"), { signal: controller.signal });
			on("change", tablet.queryList, setQuery("tablet"), { signal: controller.signal });
			on("change", desktop.queryList, setQuery("desktop"), { signal: controller.signal });
		},
	},
});
