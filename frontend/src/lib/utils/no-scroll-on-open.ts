import { checkDeviceIsMobileOrTablet } from './check-device-is-mobile-or-tablet.ts';

type NoScrollOnOpenOptions = {
	isOpen: boolean;
};

const noScrollOnOpen = (options: NoScrollOnOpenOptions) => {
	const { isOpen } = options;
	const { isMobileOrTablet } = checkDeviceIsMobileOrTablet();

	if (!isOpen) {
		document.body.style.setProperty('--overflow-y', null);
		!isMobileOrTablet && document.body.style.setProperty('--scrollbar-padding', null);
		return;
	}

	const scrollbarWidth = (window.innerWidth - document.documentElement.clientWidth) / 10;

	document.body.style.setProperty('--overflow-y', 'hidden');
	!isMobileOrTablet && document.body.style.setProperty('--scrollbar-padding', `${scrollbarWidth}rem`);
};

export { noScrollOnOpen };
