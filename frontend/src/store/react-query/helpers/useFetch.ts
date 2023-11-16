import { fetcher } from '@/api/fetcher';
import { useQueries, useQuery, type QueryFunction } from '@tanstack/react-query';
import type { ResponseData } from '../react-query-store.types';
import { transformData } from './transFormData';

type FetchOptions = {
	key: string[];
	url: string;
	staleTime?: number;
};

type QueryListType = Array<{
	queryKey: FetchOptions['key'];
	queryFn: QueryFunction<ResponseData, QueryListType[number]['queryKey']>;
	select: typeof transformData;
	staleTime?: number;
}>;

export const useFetch = (options: FetchOptions) => {
	const { key, url, staleTime } = options;

	return useQuery({
		queryKey: [...key, { url }],
		queryFn: ({ signal }) => fetcher(url, { signal }),
		select: transformData,
		staleTime,
	});
};

export const useFetchMultiple = (queryList: QueryListType) => useQueries({ queries: queryList });
