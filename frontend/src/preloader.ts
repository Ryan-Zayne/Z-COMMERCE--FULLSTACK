import { useThemeStore } from "./store/zustand/themeStore";

// NOTE - This prevents flicker of wrong theme onLoad
useThemeStore.getState().actions.initThemeOnLoad();

// NOTE - Preloader Removal
window.addEventListener("DOMContentLoaded", function removePreloader() {
	const preloaderElement = document.querySelector<HTMLElement>("#preloader");

	if (!preloaderElement) return;

	preloaderElement.style.opacity = "0";

	preloaderElement.addEventListener("transitionend", () => {
		preloaderElement.remove();
	});
});

// NOTE - Scroll restoration for moxilla browser
window.history.scrollRestoration = "auto";
