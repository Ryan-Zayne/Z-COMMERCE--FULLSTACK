import { Children, isValidElement, useMemo } from "react";
import { isArray } from "../type-helpers/typeof";

type Noop = () => void;
type WithSlot = { slot?: string };

export const isSlotElement = <TProps>(
	child: React.ReactNode,
	SlotWrapper: React.ComponentType<TProps>
) => {
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
	throwOnMultipleMatch?: boolean;
	errorMessage?: string;
};

export const useSlot = <TProps>(
	children: React.ReactNode,
	SlotWrapper: React.ComponentType<TProps>,
	options: UseSlotOptions = {}
) => {
	const {
		throwOnMultipleMatch = false,
		errorMessage = "Only one instance of the SlotComponent is allowed",
	} = options;

	const Slot = useMemo(() => {
		const childrenArray = Children.toArray(children);

		return throwOnMultipleMatch
			? childrenArray.filter((child) => isSlotElement(child, SlotWrapper))
			: childrenArray.find((child) => isSlotElement(child, SlotWrapper));
	}, [children, SlotWrapper, throwOnMultipleMatch]);

	if (isArray(Slot) && Slot.length > 1) {
		throw new Error(errorMessage);
	}

	return (isArray(Slot) ? Slot[0] : Slot) as React.ReactElement<TProps> | undefined;
};

export const useGetOtherChildren = <TProps>(
	children: React.ReactNode,
	SlotWrappers: React.ComponentType<TProps> | Array<React.ComponentType<TProps>>
) => {
	const otherChildren = useMemo(() => {
		const childrenArray = Children.toArray(children);

		// prettier-ignore
		return isArray(SlotWrappers)
			? childrenArray.filter((child) => SlotWrappers.some((slotWrapper) => !isSlotElement(child, slotWrapper)))
			: childrenArray.filter((child) => !isSlotElement(child, SlotWrappers));
	}, [SlotWrappers, children]);

	return otherChildren;
};
