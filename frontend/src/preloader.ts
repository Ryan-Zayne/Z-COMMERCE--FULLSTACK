import { noScrollOnOpen } from "./lib/utils/no-scroll-on-open";
import { on } from "./lib/utils/on";
import { useThemeStore } from "./store/zustand/themeStore";

// NOTE - This prevents flicker of wrong theme onLoad
useThemeStore.getState().actions.initThemeOnLoad();

// NOTE - Preloader Removal
const removePreloader = (...[, cleanup]: Parameters<Parameters<typeof on>[2]>) => {
	const preloaderElement = document.querySelector<HTMLElement>("#preloader");

	if (!preloaderElement) return;

	noScrollOnOpen({ isActive: true });

	preloaderElement.style.opacity = "0";

	on("transitionend", preloaderElement, () => {
		preloaderElement.remove();
		noScrollOnOpen({ isActive: false });
	});

	cleanup();
};

on("DOMContentLoaded", window, removePreloader);

// NOTE - Scroll restoration for moxilla browser
window.history.scrollRestoration = "auto";
