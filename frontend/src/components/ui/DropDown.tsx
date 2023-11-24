import { cnMerge } from '@/lib/utils/cn';

type DropDownProps = React.ComponentPropsWithoutRef<'div'>;

type DropDownHeaderProps = React.ComponentPropsWithoutRef<'header'>;

type DropDownPanelProps = Pick<DropDownProps, 'id' | 'children'> & {
	isOpen: boolean;
	panelParentClasses?: string;
	panelListClasses?: string;
};

/* eslint-disable react/jsx-props-no-spreading */

function DropDown({ children, ...otherDivElementProps }: DropDownProps) {
	return <div {...otherDivElementProps}>{children}</div>;
}

DropDown.Header = function DropDownHeader({ children, ...otherHeaderElementProps }: DropDownHeaderProps) {
	return <header {...otherHeaderElementProps}>{children}</header>;
};

DropDown.Panel = function DropDownPanel(props: DropDownPanelProps) {
	const { id = '', isOpen = false, children, panelListClasses = '', panelParentClasses = '' } = props;

	return (
		<div
			id={id}
			className={cnMerge(
				`invisible grid grid-rows-[0fr] transition-[visibility,grid-template-rows] duration-[500ms]`,
				{ 'visible grid-rows-[1fr]': isOpen },
				[panelParentClasses]
			)}
		>
			<ul className={cnMerge('overflow-y-hidden [transition:padding_500ms]', panelListClasses)}>
				{children}
			</ul>
		</div>
	);
};

export default DropDown;
