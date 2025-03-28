import { isBrowser, on } from "@zayne-labs/toolkit/core";
import { isObject } from "@zayne-labs/toolkit/type-helpers";
import { type StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";
import type { ThemeStore } from "./types";

const prefersDarkMode = isBrowser() && globalThis.matchMedia("(prefers-color-scheme: dark)").matches;

// Store Object Initializtion
const themeStoreObjectFn: StateCreator<ThemeStore> = (set, get) => ({
	isDarkMode: prefersDarkMode,

	/* eslint-disable perfectionist/sort-objects */
	theme: prefersDarkMode ? "dark" : "light",

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
