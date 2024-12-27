import { checkIsDeviceMobileOrTablet } from "@zayne-labs/toolkit/core";

type NoScrollOnOpenOptions = {
	isActive: boolean;
};

const getScrollbarWidth = () => {
	// == Store the initial overflow style
	const initialOverflowValue = document.documentElement.style.overflow;

	// == Get width without scrollbar
	document.documentElement.style.overflow = "hidden";
	const widthWithoutScrollbar = document.documentElement.clientWidth;

	// == Get width with scrollbar
	document.documentElement.style.overflow = "scroll";
	const widthWithScrollbar = document.documentElement.clientWidth;

	// == Restore the original overflow
	document.documentElement.style.overflow = initialOverflowValue;

	return widthWithoutScrollbar - widthWithScrollbar;
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

	const scrollbarWidth = getScrollbarWidth();

	isDesktop && document.body.style.setProperty("--scrollbar-padding", `${scrollbarWidth}px`);
};

export { noScrollOnOpen };
