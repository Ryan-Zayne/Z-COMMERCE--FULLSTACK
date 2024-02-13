import { prefersDarkMode } from "./constants";
import { parseJSON } from "./parseJSON";

type ThemeStateViaZustand = {
	state: {
		theme: "dark" | "light";
	};
};

const defaultSystemTheme = prefersDarkMode ? "dark" : "light";

const getThemeOnLoad = (storageKey = "colorScheme") => {
	const themeStateInStorage = parseJSON<ThemeStateViaZustand>(localStorage.getItem(storageKey));

	return themeStateInStorage?.state.theme ?? defaultSystemTheme;
};

export { getThemeOnLoad };
