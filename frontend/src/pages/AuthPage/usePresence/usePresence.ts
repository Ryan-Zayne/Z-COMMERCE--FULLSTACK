import type { UsePresence } from "./types";
import { useAnimationPresence } from "./useAnimationPresence";
import { useTransitionPresence } from "./useTransitionPresence";

/**
 * usePresence hook provides a way to animate an element, before removing it from the DOM.
 * @param defaultValue - The default value for the presence state. Defaults to `true`.
 * @param options - The options for the usePresence hook.
 * @returns A object containing the boolean that should be used to conditionally render the element (isPresent), another boolean used to toggle the animation classes, and a function to toggle the state.
 */

const usePresence: UsePresence = (options = {}) => {
	const { type = "transition", ...restOfOptions } = options;

	const useSpecificPresence = type === "transition" ? useTransitionPresence : useAnimationPresence;

	return useSpecificPresence(restOfOptions);
};

export { usePresence };
