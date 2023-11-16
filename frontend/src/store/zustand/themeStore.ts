import { getInitialThemeOnLoad } from '@/utils/get-initial-theme-on-load';
import { create, type StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ThemeStore } from './zustand-store.types';

const initialTheme = getInitialThemeOnLoad();

if (document.documentElement.dataset.theme === '') {
	document.documentElement.dataset.theme = initialTheme;
}

// Store Object Initializtion
const themeStoreObject: StateCreator<ThemeStore> = (set, get) => ({
	theme: initialTheme,
	isDarkMode: initialTheme === 'dark',

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
		partialize: ({ themeActions, ...actualState }) => ({ theme: actualState.theme }),
	})
);

// Actions hook
export const useThemeActions = () => useThemeStore((state) => state.themeActions);
