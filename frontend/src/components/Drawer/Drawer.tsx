import { RiCloseFill } from 'react-icons/ri';
import { twMerge } from 'tailwind-merge';
import Portal from '../Portal';
import type { DrawerCloseProps, DrawerContentProps, DrawerProps, OtherDrawerProps } from './drawer.types';
import { DrawerContextProvider, useDrawerStore } from './drawerStoreContext';

function Drawer({ children, ...restOfDrawerProps }: DrawerProps) {
	return (
		<DrawerContextProvider storeValues={restOfDrawerProps}>
			<Portal>
				<aside id="CartDrawer Portal">{children}</aside>
			</Portal>
		</DrawerContextProvider>
	);
}

Drawer.Overlay = function DrawerOverlay() {
	const isOpen = useDrawerStore((state) => state.isOpen);
	const onClose = useDrawerStore((state) => state.onClose);

	return (
		<div
			id="Drawer Overlay"
			onClick={onClose}
			className={twMerge(
				`fixed z-[200] w-0 bg-[hsl(0,0%,0%,0.5)] [inset:0_0_0_auto]`,
				isOpen && 'w-screen'
			)}
		/>
	);
};

Drawer.Content = function DrawerContent({ className, children, placement = 'right' }: DrawerContentProps) {
	const isOpen = useDrawerStore((state) => state.isOpen);

	const placementObject = {
		right: 'right-0 translate-x-full',
		left: 'left-0 translate-x-[-100%]',
	};

	return (
		<main
			id="Drawer Content Container"
			className={twMerge(
				`custom-scrollbar fixed bottom-0 top-0 z-[500] flex flex-col overflow-y-auto bg-body transition-transform duration-[250ms] ease-slide-out ${placementObject[placement]}`,
				[isOpen && 'translate-x-0 duration-[650ms] ease-slide-in'],
				[className]
			)}
		>
			{children}
		</main>
	);
};

Drawer.CloseButton = function DrawerCloseButton({
	className = '',
	icon = <RiCloseFill />,
}: DrawerCloseProps) {
	const onClose = useDrawerStore((state) => state.onClose);

	return (
		<button className={twMerge(`absolute ${className}`)} onClick={onClose}>
			{icon}
		</button>
	);
};

Drawer.Header = function DrawerHeader({ children, className = '' }: OtherDrawerProps) {
	return (
		<header id="Drawer Header" className={className}>
			{children}
		</header>
	);
};

Drawer.Body = function DrawerBody({ children, className = '' }: OtherDrawerProps) {
	return (
		<div id="Drawer Body" className={className}>
			{children}
		</div>
	);
};

Drawer.Footer = function DrawerFooter({ children, className = '' }: OtherDrawerProps) {
	return (
		<footer id="Drawer Footer" className={className}>
			{children}
		</footer>
	);
};

export default Drawer;
