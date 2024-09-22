import { checkIsDeviceMobileOrTablet } from "@zayne-labs/toolkit";

type NoScrollOnOpenOptions = {
	isActive: boolean;
};

const noScrollOnOpen = ({ isActive }: NoScrollOnOpenOptions) => {
	const isMobileOrTablet = checkIsDeviceMobileOrTablet();

	const isDesktop = !isMobileOrTablet;

	if (!isActive) {
		document.body.style.setProperty("--overflow-y", null);
		isDesktop && document.body.style.setProperty("--scrollbar-padding", null);
		return;
	}

	document.body.style.setProperty("--overflow-y", "hidden");

	const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
	isDesktop &&
		document.body.style.setProperty(
			"--scrollbar-padding",
			`${scrollbarWidth > 0 ? scrollbarWidth : 10}px`
		);
};

export { noScrollOnOpen };
