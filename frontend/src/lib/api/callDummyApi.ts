import { DummyResponseDataSchema } from "@/store/react-query/schema";
import { createFetchClient } from "@zayne-labs/callapi";
import { defineSchema } from "@zayne-labs/callapi/utils";

const baseSchema = defineSchema({
	"/products/category/:key": {
		data: DummyResponseDataSchema,
	},
});

const callDummyApi = createFetchClient({
	baseURL: "https://dummyjson.com",
	resultMode: "onlyData",
	schema: baseSchema,
	throwOnError: true,
});

export { callDummyApi };
