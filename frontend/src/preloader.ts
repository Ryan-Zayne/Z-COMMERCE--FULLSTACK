import { on } from "@zayne-labs/toolkit/core";
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

	noScrollOnOpen({ isActive: false });

	on("transitionend", preloaderElement, () => {
		preloaderElement.remove();
	});
};

on("DOMContentLoaded", document, removePreloader, { once: true });

// NOTE - Scroll restoration for moxilla browser
globalThis.history.scrollRestoration = "auto";
