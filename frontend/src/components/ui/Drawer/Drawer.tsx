import { Overlay, Teleport } from "@/components/primitives";
import { IconBox } from "@/components/primitives/IconBox";
import { cnMerge } from "@/lib/utils/cn";
import type {
	DrawerCloseProps,
	DrawerContentProps,
	DrawerRootProps,
	OtherDrawerProps,
} from "./drawer.types";
import { DrawerContextProvider, useDrawerStore } from "./drawerStoreContext";

function DrawerRoot({ children, ...restOfDrawerProps }: DrawerRootProps) {
	return (
		<Teleport>
			<DrawerContextProvider storeValues={restOfDrawerProps}>
				<aside data-id="Drawer-Portal">{children}</aside>
			</DrawerContextProvider>
		</Teleport>
	);
}

function DrawerOverlay() {
	const isOpen = useDrawerStore((state) => state.isOpen);
	const onClose = useDrawerStore((state) => state.onClose);

	return <Overlay isOpen={isOpen} onClose={onClose} />;
}

function DrawerContent({ className, children, placement = "right" }: DrawerContentProps) {
	const isOpen = useDrawerStore((state) => state.isOpen);

	const placementClasses = {
		right: "right-0 translate-x-full",
		left: "left-0 translate-x-[-100%]",
	};

	return (
		<main
			data-id="Drawer Content Container"
			className={cnMerge(
				`custom-scrollbar fixed inset-[0_auto_0_auto] z-[500] flex flex-col overflow-y-auto bg-body
				transition-transform ease-slide-out`,

				placementClasses[placement],

				isOpen ? "translate-x-0 duration-[600ms]" : "duration-[250ms] ease-slide-out",

				className
			)}
		>
			{children}
		</main>
	);
}

function DrawerCloseButton(props: DrawerCloseProps) {
	const { className = "", icon = "ri:close-fill" } = props;

	const onClose = useDrawerStore((state) => state.onClose);

	return (
		<button className={cnMerge(`absolute right-[2rem] top-[2rem] ${className}`)} onClick={onClose}>
			<IconBox icon={icon} />
		</button>
	);
}

function DrawerHeader({ children, className = "" }: OtherDrawerProps) {
	return (
		<header data-id="Drawer Header" className={className}>
			{children}
		</header>
	);
}

function DrawerBody({ children, className = "" }: OtherDrawerProps) {
	return (
		<div data-id="Drawer Body" className={className}>
			{children}
		</div>
	);
}

function DrawerFooter({ children, className = "" }: OtherDrawerProps) {
	return (
		<footer data-id="Drawer Footer" className={className}>
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
