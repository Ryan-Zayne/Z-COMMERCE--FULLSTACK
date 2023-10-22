import { useState } from 'react';

/**
 * A custom hook that returns a value from a store and syncs it with a local state.

 * This solves NextJs mount hydration issue.
 * */

const useFromStore = <T, U>(
	useStore: (callback: (state: T) => U) => U,
	storeCallback: (state: T) => U
) => {
	const stateFromStore = useStore(storeCallback) as U;
	const [state, setState] = useState<U>(stateFromStore);

	// Update the state whenever the stateFromStore value changes
	if (stateFromStore !== state) {
		setState(stateFromStore);
	}

	return state;
};

export { useFromStore };
