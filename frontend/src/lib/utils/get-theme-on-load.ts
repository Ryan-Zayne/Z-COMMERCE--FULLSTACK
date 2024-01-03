import { prefersDarkMode } from './constants.ts';
import { parseJSON } from './parseJson.ts';

type ThemeStateViaZustand = {
	state: { theme: 'dark' | 'light' };
};

const defaultSystemTheme = prefersDarkMode ? 'dark' : 'light';

const getThemeOnLoad = (storageKey = 'colorScheme') => {
	const themeStateInStorage = parseJSON<ThemeStateViaZustand>(localStorage.getItem(storageKey));

	return themeStateInStorage?.state.theme ?? defaultSystemTheme;
};

export { getThemeOnLoad };
