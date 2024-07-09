import { checkDeviceIsMobileOrTablet } from "./check-is-mobile-or-tablet";

type NoScrollOnOpenOptions = {
	isActive: boolean;
};

// const getScrollbarWidth = () => {
// 	// Create a div that's wider and taller than the viewport
// 	const div = document.createElement("div");
// 	div.style.width = "100%";
// 	div.style.height = "100vh";
// 	div.style.overflow = "scroll";
// 	div.style.position = "absolute";
// 	div.style.top = "-10000px";

// 	// Add it to the body
// 	document.body.append(div);

// 	// Calculate the scrollbar width
// 	const scrollbarWidth = div.offsetWidth - div.clientWidth;

// 	// Remove the div from the body
// 	div.remove();

// 	return scrollbarWidth / 10;
// };

const noScrollOnOpen = ({ isActive }: NoScrollOnOpenOptions) => {
	const { isMobileOrTablet } = checkDeviceIsMobileOrTablet();
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
