import { getInitialThemeOnLoad } from './utils/get-initial-theme-on-load.ts';

// NOTE - This prevents flicker of wrong theme onLoad
const initialTheme = getInitialThemeOnLoad();
document.documentElement.dataset.theme = initialTheme;

// NOTE - This removes default loader and lets react suspense take over. It prevents flash of white screen on load
window.addEventListener('DOMContentLoaded', () => {
	const loaderElement = document.querySelector<HTMLElement>('.loader-container');

	window.setTimeout(() => {
		if (!loaderElement) return;

		loaderElement.remove();
	}, 700);
});

// NOTE - Scroll restoration for moxilla browser
window.history.scrollRestoration = 'auto';
