export const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

export const mobileQuery = window.matchMedia('(max-width: 767px)');

export const tabletQuery = window.matchMedia('(min-width: 768px)');

export const desktopQuery = window.matchMedia('(min-width: 1000px)');

export const BASE_DUMMY_URL = 'https://dummyjson.com';

export const BASE_AUTH_URL = '/api/auth';

export const BASE_USER_URL = '/api';
