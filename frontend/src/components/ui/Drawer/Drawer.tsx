import { Portal } from '@/components/primitives/index.ts';
import { cnMerge } from '@/utils/cn.ts';
import { RiCloseFill } from 'react-icons/ri';
import type {
	DrawerCloseProps,
	DrawerContentProps,
	DrawerRootProps,
	OtherDrawerProps,
} from './drawer.types';
import { DrawerContextProvider } from './drawerStoreContext.tsx';
import { useDrawerStore } from './hooks/index.ts';

function DrawerRoot({ children, ...restOfDrawerProps }: DrawerRootProps) {
	return (
		<Portal>
			<DrawerContextProvider storeValues={restOfDrawerProps}>
				<aside data-id="Drawer Portal">{children}</aside>
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

	const placementClasses = {
		right: 'right-0 translate-x-full',
		left: 'left-0 translate-x-[-100%]',
	};

	return (
		<main
			id="Drawer Content Container"
			className={cnMerge(
				`custom-scrollbar fixed bottom-0 top-0 z-[500] flex flex-col overflow-y-auto bg-body transition-transform duration-[250ms] ease-slide-out`,
				placementClasses[placement],
				[isOpen && 'translate-x-0 duration-[600ms] ease-slide-in'],
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
		<button className={cnMerge(`absolute right-[2rem] top-[2rem] ${className}`)} onClick={onClose}>
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

const Drawer = {
	Root: DrawerRoot,
	Overlay: DrawerOverlay,
	Content: DrawerContent,
	CloseButton: DrawerCloseButton,
	Header: DrawerHeader,
	Body: DrawerBody,
	Footer: DrawerFooter,
};

export default Drawer;
