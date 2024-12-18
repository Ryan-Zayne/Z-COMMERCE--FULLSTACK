import { BASE_DUMMY_URL } from "@/lib/utils/constants";
import type { DummyResponseData } from "@/store/react-query/types";
import { createFetchClient } from "@zayne-labs/callapi";

const callDummyApi = createFetchClient<DummyResponseData, unknown, "onlySuccess">({
	baseURL: BASE_DUMMY_URL,
	resultMode: "onlySuccess",
	throwOnError: true,
});

export { callDummyApi };
