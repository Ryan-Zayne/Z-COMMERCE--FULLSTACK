import { useState } from 'react';

/**
 * A custom hook that returns a value from a store and syncs it with a local state.

 * This solves NextJs mount hydration issue.
 * */

const useFromStore = <T, U>(
	useStore: (callback: (state: T) => unknown) => unknown,
	storeCallback: (state: T) => U
) => {
	// Get the state value from the store
	const stateFromStore = useStore(storeCallback) as U;
	// Declare a state variable and a function to update it
	const [state, setState] = useState<U>();

	// Update the state whenever the stateFromStore value changes
	if (stateFromStore != null && stateFromStore !== state) {
		setState(stateFromStore);
	}

	// Return the current state value
	return state;
};

export { useFromStore };
