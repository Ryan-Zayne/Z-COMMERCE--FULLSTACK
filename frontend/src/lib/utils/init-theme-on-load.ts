import { prefersDarkMode } from "./constants";
import { parseJSON } from "./parseJSON";

type ThemeStateViaZustand = {
	state: {
		theme: "dark" | "light";
	};
};

const defaultSystemTheme = prefersDarkMode ? "dark" : "light";

const initThemeOnLoad = (storageKey = "colorScheme") => {
	const themeStateInStorage = parseJSON<ThemeStateViaZustand>(localStorage.getItem(storageKey));
	const perisistedTheme = themeStateInStorage?.state.theme;

	document.documentElement.dataset.theme = perisistedTheme ?? defaultSystemTheme;
};

export { initThemeOnLoad };
