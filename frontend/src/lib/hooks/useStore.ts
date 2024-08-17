import { useDebugValue, useSyncExternalStore } from "react";
import type { StoreApi } from "../core/createStore";
import type { SelectorFn } from "../type-helpers/global";

const useStore = <TState, TSlice>(
	store: NoInfer<StoreApi<TState, TSlice>>,
	selector: SelectorFn<TState, TSlice>
) => {
	const slice = useSyncExternalStore(
		store.subscribe,
		() => selector(store.getState()),
		() => selector(store.getInitialState())
	);

	useDebugValue(slice);

	return slice;
};

export { useStore };
