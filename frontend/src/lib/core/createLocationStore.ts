import { isBrowser } from "../utils/constants";
import { on } from "../utils/on";
import type { StoreApi } from "./createStore";

export type LocationState = {
	hash: string;
	pathname: string;
	search: string;
	state: NonNullable<unknown> | null;
};

const createLocationStore = () => {
	const locationState: LocationState = {
		hash: isBrowser() ? window.location.hash : "",
		pathname: isBrowser() ? window.location.pathname : "",
		search: isBrowser() ? window.location.search : "",
		state: isBrowser() ? (window.history.state as LocationState["state"]) : null,
	};

	const getSnapshot = () => locationState;

	const getServerSnapshot = () => locationState;

	const push = (url: string | URL, state: unknown = null) => {
		window.history.pushState(state, "", url);

		// == This has to be done in order to actually trigger the popState event, which usually only fires in the user clicks on the forward/back button.
		// LINK - https://stackoverflow.com/a/37492075/18813022

		window.dispatchEvent(new PopStateEvent("popstate", { state }));
	};

	const replace = (url: string | URL, state: unknown = null) => {
		window.history.replaceState(state, "", url);

		window.dispatchEvent(new PopStateEvent("popstate", { state }));
	};

	const subscribe: StoreApi<LocationState, LocationState>["subscribe"] = (onLocationChange) => {
		const removePopStateEvent = on("popstate", window, onLocationChange as () => void);

		return removePopStateEvent;
	};

	subscribe.withSelector = (selector, onStoreChange, subscribeOptions = {}) => {
		const { equalityFn: $equalityFn = Object.is, fireListenerImmediately = false } = subscribeOptions;

		let slice = selector(getSnapshot());

		if (fireListenerImmediately) {
			onStoreChange(slice as never, slice as never);
		}

		const modifiedOnStoreChange = ($state: LocationState) => {
			const nextSlice = selector($state);

			if ($equalityFn(slice as never, nextSlice as never)) return;

			const previousSlice = slice;

			slice = nextSlice;

			onStoreChange(slice as never, previousSlice as never);
		};

		return subscribe(modifiedOnStoreChange);
	};

	const locationStore = {
		getServerSnapshot,
		getSnapshot,
		push,
		replace,
		subscribe,
	};

	return locationStore;
};

export { createLocationStore };
