import type { DummyResponseData } from "@/store/react-query/types";
import { createFetchClient } from "@zayne-labs/callapi";

const callDummyApi = createFetchClient<DummyResponseData, false>({
	baseURL: "https://dummyjson.com",
	resultMode: "onlySuccess",
	throwOnError: true,
});

export { callDummyApi };
