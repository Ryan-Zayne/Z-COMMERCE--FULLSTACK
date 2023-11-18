import { prefersDarkMode } from '@/utils/constants.ts';
import { create, type StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ThemeStore } from './zustand-store.types';

// Store Object Initializtion
const themeStoreObjectFn: StateCreator<ThemeStore> = (set, get) => ({
	theme: prefersDarkMode ? 'dark' : 'light',
	isDarkMode: document.documentElement.dataset.theme === 'dark',

	themeActions: {
		toggleTheme: () => {
			const newtheme = get().theme === 'light' ? 'dark' : 'light';

			document.documentElement.dataset.theme = newtheme;
			document.documentElement.classList.add('theme-transition');

			document.documentElement.addEventListener('transitionend', () => {
				document.documentElement.removeAttribute('class');
			});

			set({ theme: newtheme });
		},
	},
});

// Store hook Creation
export const useThemeStore = create<ThemeStore>()(
	persist(themeStoreObjectFn, {
		name: 'colorScheme',
		version: 1,
		partialize: ({ themeActions, ...actualState }) => ({ theme: actualState.theme }),
	})
);

// Actions hook
export const useThemeActions = () => useThemeStore((state) => state.themeActions);
