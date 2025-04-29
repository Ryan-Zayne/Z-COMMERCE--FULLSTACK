import { cnMerge } from "@/lib/utils/cn";

type OverlayProps = {
	className?: string;
	isOpen: boolean;
	onClose: () => void;
};

function Overlay(props: OverlayProps) {
	const { className, isOpen, onClose } = props;

	return (
		<div
			onClick={onClose}
			className={cnMerge(
				"fixed z-[200] bg-[hsl(0,0%,0%,0.6)] [backdrop-filter:blur(0.4rem)] [inset:0_0_0_auto]",
				className,
				isOpen ? "w-screen" : "w-0"
			)}
		/>
	);
}

export { Overlay };
