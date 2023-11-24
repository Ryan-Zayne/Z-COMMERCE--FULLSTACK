import { useEffect, useState } from 'react';
import { useCallbackRef } from './useCallbackRef.ts';

/**
 * A custom hook that returns a value from a store and syncs it with a local state.

 * This solves NextJs mount hydration issue.
 * */

const useFromStore = <TState, TResult>(
	useZustandStore: (callbackFn: (state: TState) => TResult) => TResult,
	callbackFn: (state: TState) => TResult
) => {
	const selector = useCallbackRef(callbackFn);
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

const useRehydratedFromStore = <TState, TResult>(
	useZustandStore: (callbackFn: (state: TState) => TResult) => TResult,
	callbackFn: (state: TState) => TResult
) => {
	// First add skipHyrdation: true to persist function in zustand store
	const [hasHydrated, setHasHydrated] = useState(false);

	const selector = useCallbackRef(callbackFn);
	const zustandState = useZustandStore(selector);

	useEffect(
		function rehydrateStoreOnLoadEffect() {
			// @ts-ignore
			useZustandStore.persist.rehydrate();
			setHasHydrated(true);
		},

		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	return hasHydrated ? zustandState : null;
};

export { useFromStore, useRehydratedFromStore };
