import { Overlay, Teleport } from "@/components/primitives";
import { cnMerge } from "@/lib/utils/cn";
import { RiCloseFill } from "react-icons/ri";
import type {
	DrawerCloseProps,
	DrawerContentProps,
	DrawerRootProps,
	OtherDrawerProps,
} from "./drawer.types";
import { DrawerContextProvider } from "./drawerStoreContext";
import { useDrawerStore } from "./hooks";

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
				`custom-scrollbar fixed bottom-0 top-0 z-[500] flex flex-col overflow-y-auto bg-body transition-transform duration-[250ms] `,
				placementClasses[placement],
				isOpen ? "translate-x-0 duration-[600ms] ease-slide-out" : "ease-slide-in",
				[className]
			)}
		>
			{children}
		</main>
	);
}

function DrawerCloseButton(props: DrawerCloseProps) {
	const { className = "", icon = <RiCloseFill /> } = props;
	const onClose = useDrawerStore((state) => state.onClose);

	return (
		<button className={cnMerge(`absolute right-[2rem] top-[2rem] ${className}`)} onClick={onClose}>
			{icon}
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
