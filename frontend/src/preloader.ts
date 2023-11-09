// NOTE - Prevents flicker of wrong theme onLoad
const theme = JSON.parse(localStorage.getItem('colorScheme') as string)?.state?.theme as string;
document.documentElement.dataset.theme = theme;

// NOTE - Removes loader after load
const handleLoaderRemoval = () => {
	const loaderElement = document.querySelector('.loader-container') as HTMLElement;

	loaderElement.remove();

	window.removeEventListener('load', handleLoaderRemoval);
};

window.addEventListener('load', handleLoaderRemoval);

// NOTE - Scroll restoration for moxilla browser
window.history.scrollRestoration = 'auto';
