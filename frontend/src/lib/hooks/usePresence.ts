import { useEffect, useRef } from "react";
import type { Prettify } from "../type-helpers/global-type-helpers";
import { on } from "../utils/on";
import { useCallbackRef } from "./useCallbackRef";
import { useDebouncedState } from "./useDebounce";
import { useToggle } from "./useToggle";

type UsePresenceOptions<TDuration extends number | undefined> = {
	duration?: TDuration;
	callbackFn?: () => void;
};

type UsePresenceResult<TElement, TDuration> = {
	_: Prettify<
		{
			isPresent: boolean;
			isVisible: boolean;
			toggleVisbility: ReturnType<typeof useToggle>[1];
		} & (TDuration extends undefined ? { elementRef: React.RefObject<TElement> } : unknown)
	>;
}["_"];

type UsePresence = <TElement extends HTMLElement, TDuration extends number | undefined = undefined>(
	defaultValue?: boolean,
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
const usePresence: UsePresence = (defaultValue = true, options = {}) => {
	const { duration, callbackFn } = options;

	const [isShown, toggleIsShown] = useToggle(defaultValue);
	const [isMounted, setDebouncedIsMounted, setRegularIsMounted] = useDebouncedState(
		defaultValue,
		duration
	);

	const elementRef = useRef<HTMLElement>(null);

	const stableCallback = useCallbackRef(callbackFn);

	useEffect(() => {
		if (!duration) return;

		if (isShown) {
			setRegularIsMounted(true);
			return;
		}

		setDebouncedIsMounted(false);

		return () => {
			setDebouncedIsMounted.cancel();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isShown]);

	useEffect(() => {
		if (duration) return;

		if (isShown) {
			setRegularIsMounted(true);
			return;
		}

		const removeEvent = on("transitionend", elementRef.current, () => {
			setDebouncedIsMounted.cancel();
			setRegularIsMounted(false);
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
		toggleVisibliliy: toggleIsShown,
		...(duration === undefined && { elementRef }),
	} as never;
};

export { usePresence };
