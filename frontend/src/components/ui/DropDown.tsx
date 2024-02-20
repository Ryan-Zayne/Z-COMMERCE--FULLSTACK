import { cnMerge } from "@/lib/utils/cn";

type DropDownProps = React.ComponentPropsWithoutRef<"div">;

type DropDownHeaderProps = React.ComponentPropsWithoutRef<"header">;

type DropDownPanelProps = Pick<DropDownProps, "id" | "children"> & {
	isOpen: boolean;
	classNames?: {
		panelParent?: string;
		panelList?: string;
	};
};

function DropDownRoot({ children, ...otherDivProps }: DropDownProps) {
	return <div {...otherDivProps}>{children}</div>;
}

function DropDownHeader({ children, ...otherHeaderProps }: DropDownHeaderProps) {
	return <header {...otherHeaderProps}>{children}</header>;
}

function DropDownPanel(props: DropDownPanelProps) {
	const {
		id = "",
		isOpen = false,
		children,
		classNames = {
			panelParent: "",
			panelList: "",
		},
	} = props;

	return (
		<div
			id={id}
			className={cnMerge(
				"invisible grid grid-rows-[0fr] transition-[visibility,grid-template-rows] duration-[500ms]",
				isOpen && "visible grid-rows-[1fr]",
				classNames.panelParent
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
	Header: DropDownHeader,
	Panel: DropDownPanel,
};

export default DropDown;
