export const isServer = () => typeof globalThis === "undefined" || typeof document === "undefined";

export const isBrowser = () => !isServer();

export const prefersDarkMode = isServer() && globalThis.matchMedia("(prefers-color-scheme: dark)").matches;

export const mobileQuery = globalThis.matchMedia("(max-width: 767px)");

export const tabletQuery = globalThis.matchMedia("(min-width: 768px)");

export const desktopQuery = globalThis.matchMedia("(min-width: 1000px)");

export const BASE_DUMMY_URL = "https://dummyjson.com";

const BASE_API_URL = "/api/v1";

export const BASE_AUTH_URL = `${BASE_API_URL}/auth`;

export const BASE_USER_URL = `${BASE_API_URL}/user`;
