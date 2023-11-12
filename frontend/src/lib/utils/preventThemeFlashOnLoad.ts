import { prefersDarkMode } from './constants';

const preventThemeFlashOnLoad = () => {
	const themeStateInStorage = localStorage.getItem('colorScheme');

	const defaultThemeState = { state: prefersDarkMode ? 'dark' : 'light' };

	const parsedThemeState =
		(JSON.parse(themeStateInStorage as string) as { state: string } | null) ?? defaultThemeState;

	// prettier-ignore
	const { state: theme  } = parsedThemeState;

	document.documentElement.dataset.theme = theme;
};

export { preventThemeFlashOnLoad };
