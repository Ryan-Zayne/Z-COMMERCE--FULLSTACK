import { on } from "@/lib/utils/on";
import { useEffect, useRef, useState } from "react";
import { useCallbackRef } from "../useCallbackRef";
import { useDebouncedState } from "../useDebounce";
import type { UseSpecificPresence } from "./types";

const useTransitionPresence: UseSpecificPresence = (defaultValue = true, options = {}) => {
	const { onExitComplete, duration } = options;
	const [isShown, setIsShown] = useState(defaultValue);

	const [isMounted, setDebouncedIsMounted, setRegularIsMounted] = useDebouncedState(
		defaultValue,
		duration
	);
	const elementRef = useRef<HTMLElement>(null);
	const stableOnExitComplete = useCallbackRef(onExitComplete);

	const handleIsMountedWithoutRef = (value: boolean) => {
		if (value) {
			setDebouncedIsMounted(value, { $delay: 0 });
			return;
		}

		setDebouncedIsMounted(false);
	};

	const handleIsMountedWithRef = (value: boolean) => {
		if (value) {
			setDebouncedIsMounted(value, { $delay: 0 });
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
		!isMounted && stableOnExitComplete();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isMounted]);

	return {
		isPresent: isMounted || isShown,
		isVisible: isMounted && isShown,
		toggleVisibility,
		...(duration === undefined && { elementRef }),
	} as never;
};

export { useTransitionPresence };
