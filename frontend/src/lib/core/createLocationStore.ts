import { isBrowser } from "../utils/constants";
import { on } from "../utils/on";

export type LocationState = {
	state: unknown;
	hash: string;
	pathname: string;
	search: string;
};

const createLocationStore = () => {
	const locationState: LocationState = {
		state: isBrowser() ? window.history.state : null,
		hash: isBrowser() ? window.location.hash : "",
		pathname: isBrowser() ? window.location.pathname : "",
		search: isBrowser() ? window.location.search : "",
	};

	const locationStore = {
		getSnapshot: () => locationState,

		getServerSnapshot: () => locationState,

		push: (url: string | URL, state: unknown = null) => {
			window.history.pushState(state, "", url);
		},

		replace: (url: string | URL, state: unknown = null) => {
			window.history.replaceState(state, "", url);
		},

		subscribe: (onLocationChange: () => void) => {
			const removePopStateEvent = on("popstate", window, onLocationChange);

			return removePopStateEvent;
		},
	};

	return locationStore;
};

export { createLocationStore };
