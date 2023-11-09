import { cnMerge } from '@/lib/utils/cn';
import { useId } from 'react';
import { RiCloseFill } from 'react-icons/ri';
import Portal from '../Portal';
import type { DrawerCloseProps, DrawerContentProps, DrawerProps, OtherDrawerProps } from './drawer.types';
import { DrawerContextProvider, useDrawerStore } from './drawerStoreContext';

function Drawer({ children, ...restOfDrawerProps }: DrawerProps) {
	const uniqueId = useId();

	return (
		<Portal>
			<DrawerContextProvider storeValues={restOfDrawerProps}>
				<aside id={`CartDrawer Portal__(${uniqueId})`}>{children}</aside>
			</DrawerContextProvider>
		</Portal>
	);
}

function DrawerOverlay() {
	const isOpen = useDrawerStore((state) => state.isOpen);
	const onClose = useDrawerStore((state) => state.onClose);

	return (
		<div
			id="Drawer Overlay"
			onClick={onClose}
			className={cnMerge(
				`fixed z-[200] w-0 bg-[hsl(0,0%,0%,0.5)] [inset:0_0_0_auto]`,
				isOpen && 'w-screen'
			)}
		/>
	);
}

function DrawerContent({ className, children, placement = 'right' }: DrawerContentProps) {
	const isOpen = useDrawerStore((state) => state.isOpen);

	const placementObject = {
		right: 'right-0 translate-x-full',
		left: 'left-0 translate-x-[-100%]',
	};

	return (
		<main
			id="Drawer Content Container"
			className={cnMerge(
				`custom-scrollbar fixed bottom-0 top-0 z-[500] flex flex-col overflow-y-auto bg-body transition-transform duration-[250ms] ease-slide-out ${placementObject[placement]}`,
				[isOpen && 'translate-x-0 duration-[650ms] ease-slide-in'],
				[className]
			)}
		>
			{children}
		</main>
	);
}

function DrawerCloseButton(props: DrawerCloseProps) {
	const { className = '', icon = <RiCloseFill /> } = props;
	const onClose = useDrawerStore((state) => state.onClose);

	return (
		<button className={cnMerge(`absolute ${className}`)} onClick={onClose}>
			{icon}
		</button>
	);
}

function DrawerHeader({ children, className = '' }: OtherDrawerProps) {
	return (
		<header id="Drawer Header" className={className}>
			{children}
		</header>
	);
}

function DrawerBody({ children, className = '' }: OtherDrawerProps) {
	return (
		<div id="Drawer Body" className={className}>
			{children}
		</div>
	);
}

function DrawerFooter({ children, className = '' }: OtherDrawerProps) {
	return (
		<footer id="Drawer Footer" className={className}>
			{children}
		</footer>
	);
}

Drawer.Overlay = DrawerOverlay;
Drawer.Content = DrawerContent;
Drawer.Header = DrawerHeader;
Drawer.Body = DrawerBody;
Drawer.Footer = DrawerFooter;
Drawer.CloseButton = DrawerCloseButton;

export default Drawer;
