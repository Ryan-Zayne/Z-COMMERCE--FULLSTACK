import { BASE_DUMMY_URL } from '@/lib/utils/constants.ts';
import type { HTTPError } from '@/lib/utils/create-fetcher/create-fetcher.utils.ts';
import { createFetcher } from '@/lib/utils/create-fetcher/index.ts';
import type { DummyResponseData } from '@/store/react-query/react-query-store.types.ts';

const callDummyApi = createFetcher<DummyResponseData, HTTPError>({
	baseURL: BASE_DUMMY_URL,
});

export { callDummyApi };
