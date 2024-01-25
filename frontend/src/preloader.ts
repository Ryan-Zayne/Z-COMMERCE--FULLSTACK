import { getThemeOnLoad } from "./lib/utils/get-theme-on-load";

// NOTE - This prevents flicker of wrong theme onLoad
document.documentElement.dataset.theme = getThemeOnLoad();

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
