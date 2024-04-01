import { noScrollOnOpen } from "@/lib/utils/no-scroll-on-open";
import { useCallbackRef } from "./useCallbackRef";
import { useToggle } from "./useToggle";

type DisclosureOptions = {
	hasScrollControl?: boolean;
	initialState?: boolean | (() => boolean);
};

const useDisclosure = (options: DisclosureOptions = {}) => {
	const { hasScrollControl = false, initialState = false } = options;
	const [isOpen, toggleIsOpen] = useToggle(initialState);

	const handleScrollControl = useCallbackRef(
		(state: boolean) => hasScrollControl && noScrollOnOpen({ isActive: state })
	);

	const onOpen = useCallbackRef(() => {
		toggleIsOpen(true);
		handleScrollControl(true);
	});

	const onClose = useCallbackRef(() => {
		toggleIsOpen(false);
		handleScrollControl(false);
	});

	const onToggle = useCallbackRef(isOpen ? onClose : onOpen);

	return { isOpen, onOpen, onClose, onToggle };
};

export { useDisclosure };
