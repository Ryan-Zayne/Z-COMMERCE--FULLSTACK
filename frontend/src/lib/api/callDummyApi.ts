import { createFetchClient, defineSchema } from "@zayne-labs/callapi";
import { DummyResponseDataSchema } from "@/store/react-query/schema";

const baseSchema = defineSchema({
	"/products/category/:key": {
		data: DummyResponseDataSchema,
	},
});

const callDummyApi = createFetchClient({
	baseURL: "https://dummyjson.com",
	resultMode: "onlySuccessWithException",
	schema: baseSchema,
	throwOnError: true,
});

export { callDummyApi };
