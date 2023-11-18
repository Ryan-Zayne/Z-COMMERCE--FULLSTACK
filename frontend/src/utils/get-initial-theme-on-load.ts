import { isBrowser, prefersDarkMode } from './constants.ts';

type ThemeState = {
	state: { theme: 'dark' | 'light' };
};

const themeStateInStorage = JSON.parse(
	isBrowser ? (localStorage.getItem('colorScheme') as string) : 'light'
) as ThemeState | null;

const systemPreference = {
	state: { theme: prefersDarkMode ? 'dark' : 'light' },
};

const getInitialThemeOnLoad = () => {
	const resolvedThemeState = themeStateInStorage ?? systemPreference;

	return resolvedThemeState.state.theme;
};

export { getInitialThemeOnLoad };
