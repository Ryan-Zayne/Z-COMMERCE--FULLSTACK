import { cnJoin } from "@/lib/utils/cn";

type OverlayProps = {
	isOpen: boolean;
	onClose: () => void;
	"z-index"?: `z-[${number}]`;
};

function Overlay({ isOpen, onClose, "z-index": zIndex = "z-[200]" }: OverlayProps) {
	return (
		<div
			onClick={onClose}
			className={cnJoin(
				`fixed bg-[hsl(0,0%,0%,0.6)] [backdrop-filter:blur(0.4rem)] [inset:0_0_0_auto] ${zIndex}`,
				isOpen ? "w-screen" : "w-0"
			)}
		/>
	);
}

export default Overlay;
