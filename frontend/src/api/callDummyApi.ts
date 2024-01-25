import { BASE_DUMMY_URL } from "@/lib/utils/constants";
import { createFetcher } from "@/lib/utils/create-fetcher";
import type { HTTPError } from "@/lib/utils/create-fetcher/create-fetcher.utils";
import type { DummyResponseData } from "@/store/react-query/react-query-store.types";

const callDummyApi = createFetcher<DummyResponseData, HTTPError>({
	baseURL: BASE_DUMMY_URL,
});

export { callDummyApi };
