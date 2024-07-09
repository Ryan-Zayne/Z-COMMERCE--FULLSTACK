import { checkDeviceIsMobileOrTablet } from "./check-is-mobile-or-tablet";

type NoScrollOnOpenOptions = {
	isActive: boolean;
};

function getViewportScrollbarWidth() {
	// Create a div that's wider and taller than the viewport
	const div = document.createElement("div");

	console.dir(div.style);
	div.style.inset = "0";
	div.style.position = "absolute";

	// Add it to the body
	document.body.append(div);

	// Calculate the scrollbar width
	const scrollbarWidth = div.offsetWidth - div.clientWidth;

	// Remove the div from the body
	div.remove();

	return scrollbarWidth;
}
const noScrollOnOpen = ({ isActive }: NoScrollOnOpenOptions) => {
	const { isMobileOrTablet } = checkDeviceIsMobileOrTablet();
	const isDesktop = !isMobileOrTablet;

	if (!isActive) {
		document.body.style.setProperty("--overflow-y", null);
		isDesktop && document.body.style.setProperty("--scrollbar-padding", null);
		return;
	}

	document.body.style.setProperty("--overflow-y", "hidden");

	console.log(getViewportScrollbarWidth());

	const scrollbarWidth = (window.innerWidth - document.documentElement.clientWidth) / 10;

	isDesktop && document.body.style.setProperty("--scrollbar-padding", `${scrollbarWidth}rem`);
};

export { noScrollOnOpen };
