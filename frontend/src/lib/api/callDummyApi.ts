import { BASE_DUMMY_URL } from "@/lib/utils/constants";
import type { DummyResponseData } from "@/store/react-query/react-query-store.types";
import { callApi } from "@zayne-labs/callapi";

const callDummyApi = callApi.create<DummyResponseData, unknown, "onlySuccess">({
	baseURL: BASE_DUMMY_URL,
	throwOnError: true,
	resultMode: "onlySuccess",
});

export { callDummyApi };
