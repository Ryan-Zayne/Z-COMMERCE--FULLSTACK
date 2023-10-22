import { fetcher } from '@/api/fetcher';
import { useQueries, useQuery, type QueryFunction } from '@tanstack/react-query';
import { transformData } from './helpers/transFormData';
import type { ResponseData } from './react-query-store.types';

// Types
type FetchOptions = {
	key: string[];
	url: string;
	staleTime?: number;
};

type QueryListParam = Array<{
	queryKey: FetchOptions['key'];
	queryFn: QueryFunction<ResponseData, QueryListParam[number]['queryKey']>;
	select: typeof transformData;
	staleTime?: number;
}>;

// Custom Hooks
const useFetch = (options: FetchOptions) => {
	const { key, url, staleTime } = options;
	const getData = () => fetcher(url);

	return useQuery({
		queryKey: key,
		queryFn: getData,
		staleTime,
		select: transformData,
	});
};

const useFetchMultiple = (queryList: QueryListParam) =>
	useQueries({
		queries: queryList,
	});

export { useFetch, useFetchMultiple };
