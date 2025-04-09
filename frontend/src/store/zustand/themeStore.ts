import { isBrowser, on } from "@zayne-labs/toolkit-core";
import { isObject } from "@zayne-labs/toolkit-type-helpers";
import { type StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeStore = {
	actions: {
		initThemeOnLoad: () => void;
		toggleTheme: () => void;
	};
	isDarkMode: boolean;

	theme: "dark" | "light" | "system";
};

const prefersDarkMode = isBrowser() && globalThis.matchMedia("(prefers-color-scheme: dark)").matches;

const systemTheme = prefersDarkMode ? "dark" : "light";

// Store Object Initializtion
const themeStoreObjectFn: StateCreator<ThemeStore> = (set, get) => ({
	isDarkMode: systemTheme === "dark",

	/* eslint-disable perfectionist/sort-objects */
	theme: systemTheme,

	actions: {
		initThemeOnLoad: () => {
			const { theme: persistedTheme } = get();

			if (persistedTheme === "system") {
				document.documentElement.dataset.theme = systemTheme;
				return;
			}

			document.documentElement.dataset.theme = persistedTheme;
		},

		toggleTheme: () => {
			const { theme: persistedTheme } = get();

			if (persistedTheme === "system") {
				document.documentElement.dataset.theme = systemTheme;

				on("transitionend", document.documentElement, () => {
					document.documentElement.removeAttribute("class");
				});

				set({ isDarkMode: systemTheme === "dark", theme: systemTheme });

				return;
			}

			const newTheme = persistedTheme === "light" ? "dark" : "light";

			document.documentElement.dataset.theme = newTheme;

			on("transitionend", document.documentElement, () => {
				document.documentElement.removeAttribute("class");
			});

			set({ isDarkMode: newTheme === "dark", theme: newTheme });
		},
	},
	/* eslint-enable perfectionist/sort-objects */
});

const assertState = (state: unknown) => {
	if (!isObject(state)) {
		throw new Error("Invalid app state");
	}

	return state;
};

// Store hook Creation
export const useThemeStore = create<ThemeStore>()(
	persist(themeStoreObjectFn, {
		migrate: (persistedState) => {
			const validPersistedState = assertState(persistedState);

			return validPersistedState;
		},

		name: "colorScheme",

		partialize: ({ theme }) => ({ theme }),
		version: 1,
	})
);

// Actions hook
export const useThemeActions = () => useThemeStore((state) => state.actions);
