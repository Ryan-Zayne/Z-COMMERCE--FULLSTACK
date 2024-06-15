import type { DummyResponseData } from "../react-query-store.types";

/**
 * This is a helper that transforms data from the api to reduce the chain of 'data.products.whatever' to 'data.whatever'
 * */
export const transformData = (data: DummyResponseData) => data.products;
