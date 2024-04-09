import { useEffect, useState } from "react";
import type { StoreApi, UseBoundStore } from "zustand";
import type { SelectorFn } from "../type-helpers/global-type-helpers";

/**
 * A custom hook that returns a value from a store and syncs it with a local state.

 * This solves NextJs mount hydration issue.
 * */

const useFromStore = <TStore, TResult>(
	useZustandStore: UseBoundStore<StoreApi<TStore>>,
	selector: SelectorFn<TStore, TResult>
) => {
	const zustandState = useZustandStore(selector);

	const [state, setState] = useState<TResult>(zustandState);

	useEffect(
		function initializeStateAfterPaintEffect() {
			setState(zustandState);
		},

		[zustandState]
	);

	return state;
};

export { useFromStore };
