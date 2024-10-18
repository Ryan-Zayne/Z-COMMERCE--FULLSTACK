import { isArray } from "@zayne-labs/toolkit/type-helpers";
import { Children, cloneElement, isValidElement } from "react";
import SlotClone from "./SlotClone";

type SlotProps = {
	children?: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

/* -------------------------------------------------------------------------------------------------
 * Slottable
 * ----------------------------------------------------------------------------------------------- */

export function Slottable({ children }: Pick<SlotProps, "children">) {
	return children;
}

const isSlottable = (child: React.ReactNode): child is React.ReactElement => {
	return isValidElement(child) && child.type === Slottable;
};

/* -------------------------------------------------------------------------------------------------
 * Slot
 * ----------------------------------------------------------------------------------------------- */

function Slot(props: SlotProps) {
	const { children, ...restOfSlotProps } = props;

	const childrenArray = isArray<React.ReactNode>(children) ? children : [children];
	const slottable = childrenArray.find((element) => isSlottable(element));

	if (slottable) {
		// == The new element to render is the one passed as a child of `Slottable`
		// eslint-disable-next-line ts-eslint/no-unsafe-member-access
		const newElement = slottable.props.children as unknown;

		const newElementChildren = childrenArray.map((child) => {
			if (child !== slottable) {
				return child;
			}

			if (Children.count(newElement) > 1) {
				return Children.only(null);
			}

			// == Because the new element will be the one rendered, we are only interested in grabbing its children (`newElement.props.children`)
			return isValidElement<Pick<SlotProps, "children">>(newElement) ? newElement.props.children : null;
		});

		return (
			<SlotClone {...restOfSlotProps}>
				{isValidElement(newElement) ? cloneElement(newElement, undefined, newElementChildren) : null}
			</SlotClone>
		);
	}

	return <SlotClone {...restOfSlotProps}>{children}</SlotClone>;
}

export default Slot;
