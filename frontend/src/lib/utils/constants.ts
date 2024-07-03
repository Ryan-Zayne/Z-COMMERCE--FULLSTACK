export const isServer = () => typeof window === "undefined" || typeof document === "undefined";

export const isBrowser = () => !isServer();

export const prefersDarkMode = isServer() && window.matchMedia("(prefers-color-scheme: dark)").matches;

export const mobileQuery = window.matchMedia("(max-width: 767px)");

export const tabletQuery = window.matchMedia("(min-width: 768px)");

export const desktopQuery = window.matchMedia("(min-width: 1000px)");

export const BASE_DUMMY_URL = "https://dummyjson.com";

const BASE_API_URL = "/api/v1";

export const BASE_AUTH_URL = `${BASE_API_URL}/auth`;

export const BASE_USER_URL = `${BASE_API_URL}/user`;
