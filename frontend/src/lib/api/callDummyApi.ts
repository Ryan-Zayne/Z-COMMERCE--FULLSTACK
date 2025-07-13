import { createFetchClient } from "@zayne-labs/callapi";
import type { DummyResponseData } from "@/store/react-query/types";

const callDummyApi = createFetchClient<DummyResponseData, false>({
	baseURL: "https://dummyjson.com",
	resultMode: "onlySuccessWithException",
	throwOnError: true,
});

export { callDummyApi };
