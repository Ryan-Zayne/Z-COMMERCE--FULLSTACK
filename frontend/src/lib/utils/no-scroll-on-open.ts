import { checkDeviceIsMobileOrTablet } from "./check-device-is-mobile-or-tablet";

type NoScrollOnOpenOptions = {
	isActive: boolean;
};

const noScrollOnOpen = ({ isActive }: NoScrollOnOpenOptions) => {
	const { isMobileOrTablet } = checkDeviceIsMobileOrTablet();
	const isDesktop = !isMobileOrTablet;

	if (!isActive) {
		document.body.style.setProperty("--overflow-y", null);
		isDesktop && document.body.style.setProperty("--scrollbar-padding", null);
		return;
	}

	document.body.style.setProperty("--overflow-y", "hidden");

	const scrollbarWidth = (window.innerWidth - document.documentElement.clientWidth) / 10;

	isDesktop && document.body.style.setProperty("--scrollbar-padding", `${scrollbarWidth}rem`);
};

export { noScrollOnOpen };
