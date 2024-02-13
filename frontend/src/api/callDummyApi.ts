import { BASE_DUMMY_URL } from "@/lib/utils/constants";
import { createFetcher } from "@/lib/utils/create-fetcher";
import type { DummyResponseData } from "@/store/react-query/react-query-store.types";

const callDummyApi = createFetcher<DummyResponseData>({
	baseURL: BASE_DUMMY_URL,
});

export { callDummyApi };
