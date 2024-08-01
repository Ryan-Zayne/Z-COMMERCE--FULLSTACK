import { BASE_DUMMY_URL } from "@/lib/utils/constants";
import type { DummyResponseData } from "@/store/react-query/react-query-store.types";
import { createFetchClient } from "../call";

const callDummyApi = createFetchClient<DummyResponseData, unknown, "onlySuccess">({
	baseURL: BASE_DUMMY_URL,
	throwOnError: true,
	dedupeStrategy: "cancel",
	resultMode: "onlySuccess",
});

export { callDummyApi };
