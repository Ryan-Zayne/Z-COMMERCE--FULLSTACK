import { Children, cloneElement, isValidElement } from "react";
import { type PossibleRef, composeRefs } from "./composeRefs";
import { type UnknownProps, mergeProps } from "./mergeProps";

type SlotCloneProps = {
	children: React.ReactNode;
	ref?: React.RefObject<HTMLElement>;
};

function SlotClone(props: SlotCloneProps) {
	const { children, ref: forwardedRef, ...restOfSlotProps } = props;

	if (isValidElement<UnknownProps>(children)) {
		const clonedProps = {
			...mergeProps(restOfSlotProps, children.props),
			ref: forwardedRef
				? composeRefs(
						forwardedRef,
						(children.props.ref ??
							(children as unknown as typeof children.props).ref) as PossibleRef<unknown>
					)
				: (children.props.ref ?? (children as unknown as typeof children.props).ref),
		};

		return cloneElement(children, clonedProps);
	}

	return Children.count(children) > 1 ? Children.only(null) : null;
}

export default SlotClone;
