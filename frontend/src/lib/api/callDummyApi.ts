import { createFetcher } from "@/lib/core/create-fetcher";
import { BASE_DUMMY_URL } from "@/lib/utils/constants";
import type { DummyResponseData } from "@/store/react-query/react-query-store.types";

const callDummyApi = createFetcher<DummyResponseData, unknown, "onlySuccess">({
	baseURL: BASE_DUMMY_URL,
	throwOnError: true,
	resultStyle: "onlySuccess",
});

export { callDummyApi };
