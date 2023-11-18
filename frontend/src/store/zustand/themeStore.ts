import { prefersDarkMode } from '@/utils/constants.ts';
import { create, type StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ThemeStore } from './zustand-store.types';

// Store Object Initializtion
const themeStoreObject: StateCreator<ThemeStore> = (set, get) => ({
	theme: prefersDarkMode ? 'dark' : 'light',
	isDarkMode: document.documentElement.dataset.theme === 'dark',

	themeActions: {
		toggleTheme: () => {
			const newtheme = get().theme === 'light' ? 'dark' : 'light';

			document.documentElement.dataset.theme = newtheme;
			document.documentElement.classList.add('theme-transition');

			document.documentElement.addEventListener('transitionend', () => {
				document.documentElement.classList.remove('theme-transition');
			});

			set({ theme: newtheme });
		},
	},
});

// Store hook Creation
export const useThemeStore = create<ThemeStore>()(
	persist(themeStoreObject, {
		name: 'colorScheme',
		version: 1,
		partialize: ({ themeActions, ...actualState }) => ({ theme: actualState.theme }),
	})
);

// Actions hook
export const useThemeActions = () => useThemeStore((state) => state.themeActions);
