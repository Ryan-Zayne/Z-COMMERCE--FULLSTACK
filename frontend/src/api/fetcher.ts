import { BASE_DUMMY_URL } from '@/lib/utils/constants.ts';
import { createFetcherInstance } from '@/lib/utils/create-fetcher-instance/create-fetcher-instance.ts';
import type { ResponseData } from '@/store/react-query/react-query-store.types.ts';

const fetcher = createFetcherInstance<ResponseData>({
	baseURL: BASE_DUMMY_URL,
});

export { fetcher };
