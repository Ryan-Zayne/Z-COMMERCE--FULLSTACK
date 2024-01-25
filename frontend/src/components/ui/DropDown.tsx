import { cnMerge } from "@/lib/utils/cn";

type DropDownProps = React.ComponentPropsWithoutRef<"div">;

type DropDownHeaderProps = React.ComponentPropsWithoutRef<"header">;

type DropDownPanelProps = Pick<DropDownProps, "id" | "children"> & {
	isOpen: boolean;
	panelParentClasses?: string;
	panelListClasses?: string;
};

function DropDownRoot({ children, ...otherDivProps }: DropDownProps) {
	return <div {...otherDivProps}>{children}</div>;
}

function DropDownHeader({ children, ...otherHeaderProps }: DropDownHeaderProps) {
	return <header {...otherHeaderProps}>{children}</header>;
}

function DropDownPanel(props: DropDownPanelProps) {
	const { id = "", isOpen = false, children, panelListClasses = "", panelParentClasses = "" } = props;

	return (
		<div
			id={id}
			className={cnMerge(
				`invisible grid grid-rows-[0fr] transition-[visibility,grid-template-rows] duration-[500ms]`,
				{ "visible grid-rows-[1fr]": isOpen },
				[panelParentClasses]
			)}
		>
			<ul className={cnMerge("overflow-y-hidden [transition:padding_500ms]", panelListClasses)}>
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
