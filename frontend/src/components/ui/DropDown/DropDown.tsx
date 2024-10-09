import { Slot } from "@/components/primitives";
import { cnMerge } from "@/lib/utils/cn";

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

function DropDownRoot({ children, ...restOfProps }: DropDownProps) {
	return <div {...restOfProps}>{children}</div>;
}

function DropDownTrigger({ asChild, children, ...restOfProps }: DropDownHeaderProps) {
	const Component = asChild ? Slot : "header";

	return <Component {...restOfProps}>{children}</Component>;
}

function DropDownPanel(props: DropDownPanelProps) {
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

const DropDown = {
	Panel: DropDownPanel,
	Root: DropDownRoot,
	Trigger: DropDownTrigger,
};

export default DropDown;
