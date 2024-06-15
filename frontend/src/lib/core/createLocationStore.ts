import { isBrowser } from "../utils/constants";
import { on } from "../utils/on";

export type LocationState = {
	state: NonNullable<unknown> | null;
	hash: string;
	pathname: string;
	search: string;
};

const createLocationStore = () => {
	const locationState: LocationState = {
		state: isBrowser() ? (window.history.state as LocationState["state"]) : null,
		hash: isBrowser() ? window.location.hash : "",
		pathname: isBrowser() ? window.location.pathname : "",
		search: isBrowser() ? window.location.search : "",
	};

	const locationStore = {
		getSnapshot: () => locationState,

		getServerSnapshot: () => locationState,

		push: (url: string | URL, state: unknown = null) => {
			window.history.pushState(state, "", url);

			// == This has to be done in order to actually trigger the popState event, which usually only fires in the user clicks on the forward/back button.
			// LINK - https://stackoverflow.com/a/37492075/18813022

			window.dispatchEvent(new PopStateEvent("popstate", { state }));
		},

		replace: (url: string | URL, state: unknown = null) => {
			window.history.replaceState(state, "", url);

			window.dispatchEvent(new PopStateEvent("popstate", { state }));
		},

		subscribe: (onLocationChange: () => void) => {
			const removePopStateEvent = on("popstate", window, onLocationChange);

			return removePopStateEvent;
		},
	};

	return locationStore;
};

export { createLocationStore };
