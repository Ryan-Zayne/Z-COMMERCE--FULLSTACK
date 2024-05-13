import { useEffect, useRef, useState } from "react";
import type { Prettify } from "../type-helpers/global-type-helpers";
import { on } from "../utils/on";
import { useCallbackRef } from "./useCallbackRef";
import { useDebouncedState } from "./useDebounce";
import { useToggle } from "./useToggle";

type UsePresenceOptions<TDuration extends number | undefined> = {
	duration?: TDuration;
	type?: "transition" | "animation";
	callbackFn?: () => void;
};

type UsePresenceResult<TElement, TDuration> = {
	_: Prettify<
		{
			isPresent: boolean;
			isVisible: boolean;
			toggleVisibility: ReturnType<typeof useToggle>[1];
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
	const { duration, type = "animation", callbackFn } = options;

	const stableCallback = useCallbackRef(callbackFn);

	const elementRef = useRef<HTMLElement>(null);

	const [isShown, setIsShown] = useState(defaultValue);

	const [isMounted, setDebouncedIsMounted, $setRegularIsMounted] = useDebouncedState(
		defaultValue,
		duration
	);

	const setRegularIsMounted = (value: boolean) => {
		if (type === "animation") {
			$setRegularIsMounted(value);
			return;
		}

		setDebouncedIsMounted({ $delay: 0 }, value);
	};

	const handleMountedWithoutRef = (value: boolean) => {
		if (value) {
			setRegularIsMounted(true);
			return;
		}

		setDebouncedIsMounted(false);
	};

	const handleMountedWithRef = (value: boolean) => {
		if (value) {
			setRegularIsMounted(true);
			return;
		}

		on(type === "animation" ? "animationend" : "transitionend", elementRef.current, () => {
			setDebouncedIsMounted.cancel();
			$setRegularIsMounted(false);
		});
	};

	const toggleVisibility = useCallbackRef(<TValue>(newValue?: TValue) => {
		const handleMounted = !duration ? handleMountedWithRef : handleMountedWithoutRef;

		if (typeof newValue === "boolean") {
			setIsShown(newValue);
			handleMounted(newValue);
			return;
		}

		setIsShown(!isShown);
		handleMounted(!isShown);
	});

	useEffect(() => {
		!isMounted && stableCallback();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isMounted]);

	return {
		isPresent: type === "animation" ? isMounted : isMounted || isShown,
		isVisible: type === "animation" ? isShown : isMounted && isShown,
		toggleVisibility,
		...(duration === undefined && { elementRef }),
	} as never;
};

export { usePresence };
