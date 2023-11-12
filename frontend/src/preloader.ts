import { preventThemeFlashOnLoad } from './lib/utils/preventThemeFlashOnLoad';

// NOTE - Prevents flicker of wrong theme onLoad
preventThemeFlashOnLoad();

// NOTE - Remove default loader and let react suspence take over
const handleLoaderRemoval = () => {
	const loaderElement = document.querySelector<HTMLElement>('.loader-container');

	window.setTimeout(() => {
		if (!loaderElement) return;

		loaderElement.remove();
	}, 700);
};

window.addEventListener('DOMContentLoaded', handleLoaderRemoval);

// NOTE - Scroll restoration for moxilla browser
window.history.scrollRestoration = 'auto';
