import { getInitialThemeOnLoad } from './lib/utils/get-initial-theme-on-load.ts';

// NOTE - This prevents flicker of wrong theme onLoad
document.documentElement.dataset.theme = getInitialThemeOnLoad();

// NOTE - Preloader Removal
window.addEventListener('DOMContentLoaded', function removePreloader() {
	const preloaderElement = document.querySelector<HTMLElement>('#preloader');

	if (!preloaderElement) return;

	preloaderElement.style.opacity = '0';

	preloaderElement.addEventListener('transitionend', () => {
		preloaderElement.remove();
	});
});

// NOTE - Scroll restoration for moxilla browser
window.history.scrollRestoration = 'auto';
