import { useSyncExternalStore } from "react";
import { type LocationState, createLocationStore } from "../core/createLocationStore";
import type { SelectorFn } from "../type-helpers/global-type-helpers";
import { useConstant } from "./useConstant";

type UseLocationResult<TSlice> = {
	_: [
		state: TSlice,
		pushState: ReturnType<typeof createLocationStore>["push"],
		replaceState: ReturnType<typeof createLocationStore>["replace"],
	];
}["_"];

function useLocation<TSlice = LocationState>(
	selector: SelectorFn<LocationState, TSlice> = (store) => store as TSlice
): UseLocationResult<TSlice> {
	const locationStore = useConstant(() => createLocationStore());

	const locationStateSlice = useSyncExternalStore(
		locationStore.subscribe,
		() => selector(locationStore.getSnapshot()),
		() => selector(locationStore.getServerSnapshot())
	);

	return [locationStateSlice, locationStore.push, locationStore.replace];
}

export { useLocation };
