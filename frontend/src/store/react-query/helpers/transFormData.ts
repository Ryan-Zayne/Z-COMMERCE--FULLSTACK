import type { ResponseData } from '../query-hook.types';
/**
 * This is a helper that transforms data from the api so as to reduce the chain of 'data.products.whatever' to just 'data.whatever'
 * */
export const transformData = (data: ResponseData) => data.products;
