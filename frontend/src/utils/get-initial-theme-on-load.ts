import { prefersDarkMode } from './constants';

type ThemeState = {
	state: { theme: 'dark' | 'light' };
};

const getInitialThemeOnLoad = () => {
	const themeStateInStorage = localStorage.getItem('colorScheme') as string;

	const defaultSystemTheme: ThemeState = {
		state: { theme: prefersDarkMode ? 'dark' : 'light' },
	};

	const parsedThemeState = (JSON.parse(themeStateInStorage) as ThemeState | null) ?? defaultSystemTheme;

	return parsedThemeState.state.theme;
};

export { getInitialThemeOnLoad };
