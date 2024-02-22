import { noScrollOnOpen } from "@/lib/utils/no-scroll-on-open";
import { useCallback, useState } from "react";

type DisclosureOptions = {
	hasScrollControl?: boolean;
	initialState?: boolean | (() => boolean);
};

const useDisclosure = (options: DisclosureOptions = {}) => {
	const { hasScrollControl = false, initialState = false } = options;

	const [isOpen, setIsOpen] = useState(initialState);

	const handleScrollControl = useCallback(
		(state: boolean) => {
			if (!hasScrollControl) return;

			noScrollOnOpen({ isActive: state });
		},

		[hasScrollControl]
	);

	const onOpen = useCallback(() => {
		setIsOpen(true);
		handleScrollControl(true);
	}, [handleScrollControl]);

	const onClose = useCallback(() => {
		setIsOpen(false);
		handleScrollControl(false);
	}, [handleScrollControl]);

	const onToggle = useCallback(() => (isOpen ? onClose() : onOpen()), [isOpen, onClose, onOpen]);

	return { isOpen, onOpen, onClose, onToggle };
};

export { useDisclosure };
