import type { ResponseData } from '@/store/react-query/react-query-store.types.ts';
import { BASE_DUMMY_URL } from '@/utils/constants.ts';

export const fetcher = async <TData = ResponseData>(url: string, options?: RequestInit) => {
	const response = await fetch(`${BASE_DUMMY_URL}/${url}`, options);

	if (!response.ok) {
		throw new Error('Failed to fetch data from server');
	}

	return response.json() as TData;
};
