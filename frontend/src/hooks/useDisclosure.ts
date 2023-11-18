import { noScrollOnOpen } from '@/utils/no-scroll-on-open.ts';
import { useCallback, useState } from 'react';

type DisclosureOptions = {
	hasScrollControl?: boolean;
	initialState?: boolean | (() => boolean);
};

const useDisclosure = (options: DisclosureOptions = {}) => {
	const { hasScrollControl = false, initialState = false } = options;

	const [isOpen, setIsOpen] = useState(
		typeof initialState === 'boolean' ? initialState : () => initialState()
	);

	// prettier-ignore
	const handleScrollControl = useCallback((state: boolean) => {
			if (!hasScrollControl) return;

			noScrollOnOpen({ isOpen: state });
		},

		[hasScrollControl]
	);

	const onOpen = useCallback(() => {
		const newState = true;
		setIsOpen(newState);

		handleScrollControl(newState);
	}, [handleScrollControl]);

	const onClose = useCallback(() => {
		const newState = false;
		setIsOpen(newState);

		handleScrollControl(newState);
	}, [handleScrollControl]);

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
