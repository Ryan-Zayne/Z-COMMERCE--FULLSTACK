import { Children, isValidElement, useMemo } from "react";
import { isArray } from "../type-helpers/typeof";

type Noop = () => void;
type WithSlot = { slot?: string };

export const isSlotElement = (child: React.ReactNode, SlotWrapper: React.ElementType) => {
	if (!isValidElement(child)) {
		return false;
	}

	if ((child.type as WithSlot).slot && (child.type as WithSlot).slot === (SlotWrapper as WithSlot).slot) {
		return true;
	}

	if ((child.type as Noop).name === (SlotWrapper as Noop).name) {
		return true;
	}

	if (child.type === SlotWrapper) {
		return true;
	}

	return child.type.toString() === SlotWrapper.toString();
};

type UseSlotOptions = {
	throwOnMutipleMatch?: boolean;
	errorMessage?: string;
};

const useSlot = <TProps extends Record<string, unknown>>(
	children: React.ReactNode,
	SlotWrapper: React.ElementType<TProps>,
	options: UseSlotOptions = {}
) => {
	const {
		throwOnMutipleMatch = false,
		errorMessage = "Only one instance of the SlotComponent is allowed",
	} = options;

	const Slot = useMemo(() => {
		const childrenArray = Children.toArray(children);

		return throwOnMutipleMatch
			? childrenArray.filter((child) => isSlotElement(child, SlotWrapper))
			: childrenArray.find((child) => isSlotElement(child, SlotWrapper));
	}, [children, throwOnMutipleMatch, SlotWrapper]);

	if (isArray(Slot) && Slot.length > 1) {
		throw new Error(errorMessage);
	}

	return (isArray(Slot) ? Slot[0] : Slot) as React.ReactElement<TProps> | undefined;
};

export { useSlot };
