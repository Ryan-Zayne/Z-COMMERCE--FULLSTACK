import { useCallback, useState } from 'react';
import { noScrollOnOpen } from '../utils/no-scroll-on-open';

type DisclosureOptions = {
	scrollControl?: boolean;
	initFn?: () => boolean;
};

const useDisclosure = (options: DisclosureOptions = {}) => {
	const { scrollControl = false, initFn } = options;

	const [isOpen, setIsOpen] = useState(initFn ?? false);

	const onOpen = useCallback(() => {
		const newState = true;
		setIsOpen(newState);

		scrollControl && noScrollOnOpen({ isOpen: newState });
	}, [scrollControl]);

	const onClose = useCallback(() => {
		const newState = false;
		setIsOpen(newState);

		scrollControl && noScrollOnOpen({ isOpen: newState });
	}, [scrollControl]);

	const onToggle = useCallback(() => {
		if (isOpen) {
			onClose();
		} else {
			onOpen();
		}
	}, [isOpen, onClose, onOpen]);

	return { isOpen, onOpen, onClose, onToggle };
};

export { useDisclosure };

