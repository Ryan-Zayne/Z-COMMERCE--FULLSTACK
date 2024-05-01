import { useEffect, useRef } from "react";
import { on } from "../utils/on";
import { useCallbackRef } from "./useCallbackRef";
import { useDebouncedState } from "./useDebounce";
import { useToggle } from "./useToggle";

type UsePresenceOptions<TDuration extends number | undefined> = {
	defaultValue?: boolean;
	duration?: TDuration;
	callbackFn?: () => void;
};

type UsePresenceResult<TElement, TDuration> = {
	_: {
		isPresent: boolean;
		isVisible: boolean;
		toggleIsShown: ReturnType<typeof useToggle>[1];
	} & (TDuration extends undefined ? { elementRef: React.RefObject<TElement> } : unknown);
}["_"];

type UsePresence = <TElement extends HTMLElement, TDuration extends number | undefined = undefined>(
	options?: UsePresenceOptions<TDuration>
) => UsePresenceResult<TElement, TDuration>;

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
const usePresence: UsePresence = (options = {}) => {
	const { defaultValue = true, duration, callbackFn } = options;

	const [isShown, toggleIsShown] = useToggle(defaultValue);
	const [isMounted, setDebouncedIsMounted, setIsMounted] = useDebouncedState(defaultValue, duration);

	const elementRef = useRef<HTMLElement>(null);

	const stableCallback = useCallbackRef(callbackFn);

	useEffect(() => {
		if (!duration) return;

		if (isShown) {
			setIsMounted(true);
			return;
		}

		setDebouncedIsMounted(false);

		return () => {
			setDebouncedIsMounted.cancelTimeout();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isShown]);

	useEffect(() => {
		if (duration) return;

		if (isShown) {
			setIsMounted(true);
			return;
		}

		const removeEvent = on("transitionend", elementRef.current, () => {
			setDebouncedIsMounted.cancelTimeout();
			setIsMounted(false);
		});

		return removeEvent;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [duration, isShown]);

	useEffect(() => {
		!isMounted && stableCallback();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isMounted]);

	return {
		isPresent: isMounted || isShown,
		isVisible: isMounted && isShown,
		toggleIsShown,
		...(duration === undefined && { elementRef }),
	} as never;
};

export { usePresence };
