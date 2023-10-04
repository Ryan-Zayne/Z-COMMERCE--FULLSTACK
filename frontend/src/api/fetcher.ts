import { BASE_DUMMY_URL } from '@/utils/constants';
import type { ResponseData } from '../store/react-query/query-hook.types';

export const fetcher = async <TData = ResponseData>(url: string) => {
	const response = await fetch(`${BASE_DUMMY_URL}/${url}`);

	if (!response.ok) {
		throw new Error('Sorry, something went wrong');
	}

	return response.json() as Promise<TData>;
};
