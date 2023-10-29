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
			const newMode = get().theme === 'dark';

			set({ theme: newtheme });
			set({ isDarkMode: newMode });

			document.documentElement.dataset.theme = newtheme;
			document.documentElement.classList.add('theme-transition');

			document.documentElement.addEventListener('transitionend', () => {
				document.documentElement.classList.remove('theme-transition');
			});
		},
	},
});

// Store hook Creation
export const useThemeStore = create<ThemeStore>()(
	persist(themeStoreObject, {
		name: 'colorScheme',
		partialize: ({ themeActions, ...actualState }) => actualState,
	})
);

// Actions hook
export const useThemeActions = () => useThemeStore((state) => state.themeActions);
