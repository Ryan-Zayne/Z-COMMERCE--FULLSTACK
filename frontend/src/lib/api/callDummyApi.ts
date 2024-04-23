import { createFetcher } from "@/lib/core/create-fetcher";
import { BASE_DUMMY_URL } from "@/lib/utils/constants";
import type { DummyResponseData } from "@/store/react-query/react-query-store.types";

const callDummyApi = createFetcher<DummyResponseData, unknown, true>({
	baseURL: BASE_DUMMY_URL,
	shouldThrowErrors: true,
});

export { callDummyApi };
