import { useSyncExternalStore } from "react";
import { type LocationState, createLocationStore } from "../core/createLocationStore";
import type { SelectorFn } from "../type-helpers/global-type-helpers";
import { useConstant } from "./useConstant";

const useLocation = <TSlice = LocationState>(
	selector: SelectorFn<LocationState, TSlice> = (store) => store as TSlice
) => {
	const locationStore = useConstant(() => createLocationStore());

	const stateSlice = useSyncExternalStore(
		locationStore.subscribe,
		() => selector(locationStore.getSnapshot()),
		() => selector(locationStore.getServerSnapshot())
	);

	return [stateSlice, { push: locationStore.push, replace: locationStore.replace }] as [
		state: typeof stateSlice,
		setState: { push: typeof locationStore.push; replace: typeof locationStore.replace },
	];
};

export { useLocation };
