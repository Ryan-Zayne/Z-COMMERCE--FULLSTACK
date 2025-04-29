import { Slot } from "@/components/primitives/slot";
import { cnMerge } from "@/lib/utils/cn";
import { createCustomContext, useDisclosure } from "@zayne-labs/toolkit-react";
import type { PolymorphicProps } from "@zayne-labs/toolkit-react/utils";

type DropDownProps = React.ComponentPropsWithoutRef<"div">;

type DropDownHeaderProps = React.ComponentPropsWithoutRef<"header"> & {
	asChild?: boolean;
};

type DropDownPanelProps = Pick<DropDownProps, "children" | "id"> & {
	classNames?: {
		panelContainer?: string;
		panelList?: string;
	};
	isOpen: boolean;
};

export function DropDownRoot<TElement extends React.ElementType = "div">(
	props: PolymorphicProps<TElement, DropDownProps>
) {
	const { as: Element = "div", children, ...restOfProps } = props;

	const dropDownCtx = useDropDown();

	return <Element {...restOfProps}>{children}</Element>;
}

export function DropDownTrigger({ asChild, children, ...restOfProps }: DropDownHeaderProps) {
	const Component = asChild ? Slot : "header";

	return <Component {...restOfProps}>{children}</Component>;
}

export function DropDownPanel(props: DropDownPanelProps) {
	const { children, classNames, id = "", isOpen = false } = props;

	return (
		<div
			id={id}
			className={cnMerge(
				"invisible grid grid-rows-[0fr] transition-[visibility,grid-template-rows] duration-[500ms]",
				isOpen && "visible grid-rows-[1fr]",
				classNames?.panelContainer
			)}
		>
			<ul className={cnMerge("overflow-y-hidden [transition:padding_500ms]", classNames?.panelList)}>
				{children}
			</ul>
		</div>
	);
}

export const Panel = DropDownPanel;
export const Trigger = DropDownTrigger;
export const Root = DropDownRoot;

export const useDropDown = () => useDisclosure();
