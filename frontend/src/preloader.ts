// NOTE - Prevents flicker of wrong theme onLoad
const theme = JSON.parse(localStorage.getItem('colorScheme') ?? '')?.state?.theme as string;
document.documentElement.dataset.theme = theme;

const loaderElement = document.querySelector('.loader-container') as HTMLElement;

const handleLoaderRemoval = () => {
	loaderElement.style.opacity = '0';

	const loaderTimeout = setTimeout(() => {
		loaderElement.remove();
		window.removeEventListener('DOMContentLoaded', handleLoaderRemoval);
		clearTimeout(loaderTimeout);
	}, 1300);
};

window.addEventListener('DOMContentLoaded', handleLoaderRemoval);

// NOTE - Scroll restoration for moxilla browser
window.history.scrollRestoration = 'auto';
