// NOTE - Prevents flicker of wrong theme onLoad
const theme = JSON.parse(localStorage.getItem('colorScheme') as string)?.state?.theme as string;
document.documentElement.dataset.theme = theme;

const handleLoaderRemoval = () => {
	const loaderElement = document.querySelector('.loader-container') as HTMLElement;

	setTimeout(() => {
		loaderElement.remove();

		window.removeEventListener('DOMContentLoaded', handleLoaderRemoval);
	}, 1300);
};

window.addEventListener('DOMContentLoaded', handleLoaderRemoval);

// NOTE - Scroll restoration for moxilla browser
window.history.scrollRestoration = 'auto';
