import { isObject } from "@/lib/type-helpers/typeof";
import { prefersDarkMode } from "@/lib/utils/constants";
import { on } from "@/lib/utils/on";
import { type StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";
import type { ThemeStore } from "./zustand-store.types";

// Store Object Initializtion
const themeStoreObjectFn: StateCreator<ThemeStore> = (set, get) => ({
	theme: prefersDarkMode ? "dark" : "light",
	isDarkMode: document.documentElement.dataset.theme === "dark",

	actions: {
		toggleTheme: () => {
			const newTheme = get().theme === "light" ? "dark" : "light";

			document.documentElement.dataset.theme = newTheme;

			document.documentElement.classList.add("theme-transition");

			on("transitionend", document.documentElement, () => {
				document.documentElement.removeAttribute("class");
			});

			set({ theme: newTheme, isDarkMode: newTheme === "dark" });
		},

		initThemeOnLoad: () => {
			const { theme: persistedTheme } = get();

			document.documentElement.dataset.theme = persistedTheme;
		},
	},
});

const assertState = <TState>(state: unknown) => {
	if (!isObject(state)) {
		throw new TypeError("Invalid app state");
	}

	return state as TState;
};

// Store hook Creation
export const useThemeStore = create<ThemeStore>()(
	persist(themeStoreObjectFn, {
		name: "colorScheme",
		version: 1,
		partialize: ({ theme }) => ({ theme }),
		migrate(persistedState) {
			const validPersistedState = assertState<ThemeStore>(persistedState);

			return validPersistedState;
		},
	})
);

// Actions hook
export const useThemeActions = () => useThemeStore((state) => state.actions);
