import { BASE_DUMMY_URL } from '@/lib/utils/constants';
import type { ResponseData } from '../store/react-query/react-query-store.types';

export const fetcher = async <TData = ResponseData>(url: string, options?: RequestInit) => {
	const response = await fetch(`${BASE_DUMMY_URL}/${url}`, options);

	if (!response.ok) {
		throw new Error('Failed to fetch data');
	}

	return response.json() as TData;
};
