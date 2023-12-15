import { getInitialThemeOnLoad } from './lib/utils/get-initial-theme-on-load.ts';

// NOTE - This prevents flicker of wrong theme onLoad
const initialTheme = getInitialThemeOnLoad();
document.documentElement.dataset.theme = initialTheme;

// NOTE - Scroll restoration for moxilla browser
window.history.scrollRestoration = 'auto';
