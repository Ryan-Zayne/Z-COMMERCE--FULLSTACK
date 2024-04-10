import { checkDeviceIsMobileOrTablet } from "./check-device-is-mobile-or-tablet";
import { getScrollBarWidth } from "./constants";

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

	isDesktop && document.body.style.setProperty("--scrollbar-padding", `${getScrollBarWidth()}rem`);
};

export { noScrollOnOpen };
