import { checkDeviceIsMobileOrTablet } from './check-device-is-mobile-or-tablet';

type NoScrollOnOpenOptions = {
	isOpen: boolean;
	deactivateOnMobile?: boolean;
};

const noScrollOnOpen = (options: NoScrollOnOpenOptions) => {
	const { isOpen, deactivateOnMobile = false } = options;
	const { isMobileOrTablet } = checkDeviceIsMobileOrTablet();

	if (deactivateOnMobile && isMobileOrTablet) return;

	if (!isOpen) {
		document.body.style.setProperty('--scrollbar-padding', '');
		document.body.style.setProperty('--overflow-y', '');
		return;
	}

	const scrollbarWidth = (window.innerWidth - document.documentElement.clientWidth) / 10;

	document.body.style.setProperty('--scrollbar-padding', `${scrollbarWidth}rem`);
	document.body.style.setProperty('--overflow-y', 'hidden');
};

export { noScrollOnOpen };
