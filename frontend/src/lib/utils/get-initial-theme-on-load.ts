import { isBrowser, prefersDarkMode } from './constants.ts';

type ThemeState = {
	state: { theme: 'dark' | 'light' };
};

const parseJSON = <TResult>(value: ReturnType<typeof localStorage.getItem>) => {
	if (!isBrowser || value == null) {
		return null;
	}

	return JSON.parse(value) as TResult;
};

const defaultSystemPreference = {
	state: { theme: prefersDarkMode ? 'dark' : 'light' },
} satisfies ThemeState;

const themeStateInStorage = parseJSON<ThemeState>(localStorage.getItem('colorScheme'));

const getInitialThemeOnLoad = () => {
	const resolvedThemeState = themeStateInStorage ?? defaultSystemPreference;

	return resolvedThemeState.state.theme;
};

export { getInitialThemeOnLoad };
