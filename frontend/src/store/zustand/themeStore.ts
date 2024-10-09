import { isBrowser, on } from "@zayne-labs/toolkit";
import { isObject } from "@zayne-labs/toolkit/type-helpers";
import { type StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";
import type { ThemeStore } from "./zustand-store.types";

const prefersDarkMode = isBrowser() && globalThis.matchMedia("(prefers-color-scheme: dark)").matches;

// Store Object Initializtion
const themeStoreObjectFn: StateCreator<ThemeStore> = (set, get) => ({
	isDarkMode: prefersDarkMode,

	theme: prefersDarkMode ? "dark" : "light",

	// eslint-disable-next-line perfectionist/sort-objects
	actions: {
		initThemeOnLoad: () => {
			const { theme: persistedTheme } = get();

			document.documentElement.dataset.theme = persistedTheme;
		},

		toggleTheme: () => {
			const newTheme = get().theme === "light" ? "dark" : "light";

			document.documentElement.dataset.theme = newTheme;

			document.documentElement.classList.add("theme-transition");

			on("transitionend", document.documentElement, () => {
				document.documentElement.removeAttribute("class");
			});

			set({ isDarkMode: newTheme === "dark", theme: newTheme });
		},
	},
});

const assertState = (state: unknown) => {
	if (!isObject(state)) {
		throw new TypeError("Invalid app state");
	}

	return state;
};

// Store hook Creation
export const useThemeStore = create<ThemeStore>()(
	persist(themeStoreObjectFn, {
		name: "colorScheme",
		version: 1,

		// eslint-disable-next-line perfectionist/sort-objects
		migrate(persistedState) {
			const validPersistedState = assertState(persistedState);

			return validPersistedState;
		},
		partialize: ({ theme }) => ({ theme }),
	})
);

// Actions hook
export const useThemeActions = () => useThemeStore((state) => state.actions);
