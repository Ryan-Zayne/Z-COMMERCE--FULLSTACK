import { create, type StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';
import { prefersDarkMode } from '../../utils/constants';
import type { ThemeStore } from './zustand-store.types';

// Store Object Initializtion
const themeStoreObject: StateCreator<ThemeStore> = (set, get) => ({
	theme: prefersDarkMode ? 'dark' : 'light',
	isDarkMode: document.documentElement.dataset.theme === 'dark',

	themeActions: {
		toggleTheme: () => {
			const newtheme = get().theme === 'dark' ? 'light' : 'dark';
			set({ theme: newtheme });

			document.documentElement.classList.add('theme-transition');

			const timeoutId = setTimeout(() => {
				document.documentElement.classList.remove('theme-transition');
				clearTimeout(timeoutId);
			}, 600);
		},

		toggleIsDarkMode: () => {
			const newMode = get().theme === 'dark';
			set({ isDarkMode: newMode });
		},
	},
});

// Store hook Creation
export const useThemeStore = create<ThemeStore>()(
	persist(themeStoreObject, {
		name: 'colorScheme',
		partialize: ({ themeActions, ...state }) => state,
	})
);

// Actions hook
export const useThemeActions = () => useThemeStore((state) => state.themeActions);
