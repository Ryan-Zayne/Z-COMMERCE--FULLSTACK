import { useSyncExternalStore } from "react";
import type { Prettify, SelectorFn } from "../type-helpers/global-type-helpers";
import { isBrowser } from "../utils/constants";
import { on } from "../utils/on";
import { useConstant } from "./useConstant";

type LocationState = {
	hash: string;
	pathname: string;
	search: string;
};

const createLocationStore = <THistoryState>() => {
	const locationState = {
		state: isBrowser() ? (window.history.state as THistoryState) : null,
		hash: isBrowser() ? window.location.hash : "",
		pathname: isBrowser() ? window.location.pathname : "",
		search: isBrowser() ? window.location.search : "",
	};

	const locationStore = {
		getSnapshot: () => locationState,

		getServerSnapshot: () => locationState,

		push: (url: string | URL, state: THistoryState | null = null) => {
			window.history.pushState(state, "", url);
		},

		replace: (url: string | URL, state: THistoryState | null = null) => {
			window.history.replaceState(state, "", url);
		},

		subscribe: (onLocationChange: () => void) => {
			const removePopStateEvent = on("popstate", window, onLocationChange);

			return removePopStateEvent;
		},
	};

	return locationStore;
};

function useLocation<TSlice = Prettify<LocationState>, THistoryState = unknown>(
	selector: SelectorFn<LocationState, TSlice> = (store) => store as TSlice
) {
	const locationStore = useConstant(() => createLocationStore<THistoryState>());

	const locationStateSlice = useSyncExternalStore(
		locationStore.subscribe,
		() => selector(locationStore.getSnapshot()),
		() => selector(locationStore.getServerSnapshot())
	);

	return [locationStateSlice, { push: locationStore.push, replace: locationStore.replace }] as const;
}

export { useLocation };
