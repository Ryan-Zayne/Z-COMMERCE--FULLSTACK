import { noScrollOnOpen } from "./lib/utils/no-scroll-on-open";
import { useThemeStore } from "./store/zustand/themeStore";

// NOTE - This prevents flicker of wrong theme onLoad
useThemeStore.getState().actions.initThemeOnLoad();

// NOTE - Preloader Removal
const removePreloader = () => {
	const preloaderElement = document.querySelector<HTMLElement>("#preloader");

	if (!preloaderElement) return;

	noScrollOnOpen({ isActive: true });

	preloaderElement.style.opacity = "0";

	preloaderElement.addEventListener("transitionend", () => {
		preloaderElement.remove();
		noScrollOnOpen({ isActive: false });
	});

	window.removeEventListener("DOMContentLoaded", removePreloader);
};

window.addEventListener("DOMContentLoaded", removePreloader);

// NOTE - Scroll restoration for moxilla browser
window.history.scrollRestoration = "auto";
