export const mobileQuery = globalThis.matchMedia("(max-width: 767px)");

export const tabletQuery = globalThis.matchMedia("(min-width: 768px)");

export const desktopQuery = globalThis.matchMedia("(min-width: 1000px)");

export const BASE_DUMMY_URL = "https://dummyjson.com";

const BASE_API_URL = "/api/v1";

export const BASE_AUTH_URL = `${BASE_API_URL}/auth`;
