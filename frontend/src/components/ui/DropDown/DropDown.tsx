import { Slot } from "@/components/primitives";
import { cnMerge } from "@/lib/utils/cn";

type DropDownProps = React.ComponentPropsWithoutRef<"div">;

type DropDownHeaderProps = React.ComponentPropsWithoutRef<"header"> & {
	asChild?: boolean;
};

type DropDownPanelProps = Pick<DropDownProps, "id" | "children"> & {
	isOpen: boolean;
	classNames?: {
		panelContainer?: string;
		panelList?: string;
	};
};

function DropDownRoot({ children, ...restOfProps }: DropDownProps) {
	return <div {...restOfProps}>{children}</div>;
}

function DropDownTrigger({ asChild, children, ...restOfProps }: DropDownHeaderProps) {
	const Component = asChild ? Slot : "header";

	return <Component {...restOfProps}>{children}</Component>;
}

function DropDownPanel(props: DropDownPanelProps) {
	const {
		id = "",
		isOpen = false,
		children,
		classNames = {
			panelContainer: "",
			panelList: "",
		},
	} = props;

	return (
		<div
			id={id}
			className={cnMerge(
				"invisible grid grid-rows-[0fr] transition-[visibility,grid-template-rows] duration-[500ms]",
				isOpen && "visible grid-rows-[1fr]",
				classNames.panelContainer
			)}
		>
			<ul className={cnMerge("overflow-y-hidden [transition:padding_500ms]", classNames.panelList)}>
				{children}
			</ul>
		</div>
	);
}

const DropDown = {
	Root: DropDownRoot,
	Trigger: DropDownTrigger,
	Panel: DropDownPanel,
};

export default DropDown;
