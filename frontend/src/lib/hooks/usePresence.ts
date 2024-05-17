import { useEffect, useRef, useState } from "react";
import type { Prettify } from "../type-helpers/global-type-helpers";
import { on } from "../utils/on";
import { useCallbackRef } from "./useCallbackRef";
import { useDebouncedState } from "./useDebounce";
import { useToggle } from "./useToggle";

type UsePresenceOptions<TDuration extends number | undefined, THasType extends boolean> = Prettify<
	{
		duration?: TDuration;
		callbackFn?: () => void;
	} & (THasType extends true ? { type?: "animation" | "transition" } : unknown)
>;

type UsePresenceResult<TElement, TDuration> = Prettify<
	{
		isPresent: boolean;
		isVisible: boolean;
		toggleVisibility: ReturnType<typeof useToggle>[1];
	} & (TDuration extends undefined ? { elementRef: React.RefObject<TElement> } : unknown)
>;

type UseSpecificPresence = <
	TElement extends HTMLElement,
	TDuration extends number | undefined = undefined,
>(
	defaultValue?: boolean,
	options?: UsePresenceOptions<TDuration, false>
) => UsePresenceResult<TElement, TDuration>;

type UsePresence = <TElement extends HTMLElement, TDuration extends number | undefined = undefined>(
	defaultValue?: boolean,
	options?: UsePresenceOptions<TDuration, true>
) => UsePresenceResult<TElement, TDuration>;

const useAnimationPresence: UseSpecificPresence = (defaultValue = true, options = {}) => {
	const { callbackFn, duration } = options;
	const [isShown, setIsShown] = useState(defaultValue);
	const [isMounted, setDebouncedIsMounted, setRegularIsMounted] = useDebouncedState(
		defaultValue,
		duration
	);
	const elementRef = useRef<HTMLElement>(null);
	const stableCallback = useCallbackRef(callbackFn);

	const handleIsMountedWithoutRef = (value: boolean) => {
		if (value) {
			setRegularIsMounted(true);
			return;
		}

		setDebouncedIsMounted(false);
	};

	const handleIsMountedWithRef = (value: boolean) => {
		if (value) {
			setRegularIsMounted(true);
			return;
		}

		on("animationend", elementRef.current, () => {
			setDebouncedIsMounted.cancel();
			setRegularIsMounted(false);
		});
	};

	const toggleVisibility = useCallbackRef(<TValue>(newValue?: TValue) => {
		const handleSetIsMounted = !duration ? handleIsMountedWithRef : handleIsMountedWithoutRef;

		if (typeof newValue === "boolean") {
			setIsShown(newValue);
			handleSetIsMounted(newValue);
			return;
		}

		setIsShown(!isShown);
		handleSetIsMounted(!isShown);
	});

	useEffect(() => {
		!isMounted && stableCallback();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isMounted]);

	return {
		isPresent: isMounted,
		isVisible: isShown,
		toggleVisibility,
		...(duration === undefined && { elementRef }),
	} as never;
};

const useTransitionPresence: UseSpecificPresence = (defaultValue = true, options = {}) => {
	const { callbackFn, duration } = options;
	const [isShown, setIsShown] = useState(defaultValue);
	const [isMounted, setDebouncedIsMounted, setRegularIsMounted] = useDebouncedState(
		defaultValue,
		duration
	);
	const elementRef = useRef<HTMLElement>(null);
	const stableCallback = useCallbackRef(callbackFn);

	const handleIsMountedWithoutRef = (value: boolean) => {
		if (value) {
			setDebouncedIsMounted({ $delay: 0 }, value);
			return;
		}

		setDebouncedIsMounted(false);
	};

	const handleIsMountedWithRef = (value: boolean) => {
		if (value) {
			setDebouncedIsMounted({ $delay: 0 }, value);
			return;
		}

		on("transitionend", elementRef.current, () => {
			setDebouncedIsMounted.cancel();
			setRegularIsMounted(false);
		});
	};

	const toggleVisibility = useCallbackRef(<TValue>(newValue?: TValue) => {
		const handleSetIsMounted = !duration ? handleIsMountedWithRef : handleIsMountedWithoutRef;

		if (typeof newValue === "boolean") {
			setIsShown(newValue);
			handleSetIsMounted(newValue);
			return;
		}

		setIsShown(!isShown);
		handleSetIsMounted(!isShown);
	});

	useEffect(() => {
		!isMounted && stableCallback();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isMounted]);

	return {
		isPresent: isMounted || isShown,
		isVisible: isMounted && isShown,
		toggleVisibility,
		...(duration === undefined && { elementRef }),
	} as never;
};

/**
 * usePresence hook provides a way to animate an element, before removing it from the DOM.
 *
 * @param defaultValue - The default value for the presence state. Defaults to `true`.
 * @param options - The options for the usePresence hook.
 * @param options.type - The type of animation is a transition or an animation. Defaults to "animation".
 * @param options.duration - The duration in milliseconds for the debounce effect. Defaults to `150`.
 * @param options.callbackFn - A callback function to be called when the animation is over (when the presence state changes to `false`).
 *
 * @returns A tuple containing the boolean that should be used to show and hide the element state and a function to toggle the presence state.
 */

const usePresence: UsePresence = (defaultValue = true, options = {}) => {
	const { duration, type = "animation", callbackFn } = options;

	const useSpecificPresence = type === "animation" ? useAnimationPresence : useTransitionPresence;

	return useSpecificPresence(defaultValue, { duration, callbackFn });
};

export { usePresence };
