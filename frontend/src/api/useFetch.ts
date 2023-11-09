import { fetcher } from '@/api/fetcher';
import { transformData } from '@/store/react-query/helpers/transFormData';
import type { ResponseData } from '@/store/react-query/react-query-store.types';
import {
	useQueries,
	useQuery,
	type QueryFunction,
	type QueryFunctionContext,
} from '@tanstack/react-query';

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

	const getData = ({ signal }: QueryFunctionContext<string[], unknown>) => fetcher(url, { signal });

	return useQuery({
		queryKey: key,
		queryFn: getData,
		staleTime,
		select: transformData,
	});
};

export const useFetchMultiple = (queryList: QueryListType) => useQueries({ queries: queryList });
