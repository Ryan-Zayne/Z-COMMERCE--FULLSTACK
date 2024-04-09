import { useLayoutEffect, useRef } from "react";
import { useCallbackRef } from "./useCallbackRef";
import { useDebouncedState } from "./useDebounce";

type UsePresenceOptions = {
	defaultValue?: boolean;
	duration?: number;
	callbackFn?: () => void;
};

/**
 *  usePresence hook provides a way to animate an element, before removing it from the DOM.
 *
 * @param options - The options for the usePresence hook.
 * @param options.defaultValue - The default value for the presence state. Defaults to `true`.
 * @param options.duration - The duration in milliseconds for the debounce effect. Defaults to `150`.
 * @param options.callbackFn - An callback function to be called when the animation is over (when the presence state changes to `false`).
 *
 * @returns A tuple containing the boolean that should be used to show and hide the element state and a function to toggle the presence state.
 */
const usePresence = (options: UsePresenceOptions) => {
	const { defaultValue = true, duration = 150, callbackFn } = options;

	const [present, setPresent] = useDebouncedState(defaultValue, duration);

	const animatedElementRef = useRef<HTMLElement>(null);

	const savedCallback = useCallbackRef(callbackFn);

	useLayoutEffect(() => {
		if (!animatedElementRef.current) return;

		const element = animatedElementRef.current;

		const handlePresence = () => {
			setPresent.cancelTimeout();
			setPresent(true);
		};

		element.addEventListener("transitionend", handlePresence);
		element.addEventListener("animationend", handlePresence);

		return () => {
			element.removeEventListener("transitionend", handlePresence);
			element.removeEventListener("animationend", handlePresence);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useLayoutEffect(() => {
		!present && savedCallback();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [present]);

	return { present, setPresent, animatedElementRef };
};

export { usePresence };
