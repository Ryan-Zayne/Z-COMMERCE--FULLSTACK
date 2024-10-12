import { callDummyApi } from "@/lib/api/callDummyApi";
import { queryOptions } from "@tanstack/react-query";
import { defineEnum } from "@zayne-labs/toolkit/type-helpers";
import type { DummyResponseData } from "./types";

// TODO - Remove once you start serving the products from your backend

const watchesProductKeys = defineEnum(["mens-watches", "womens-watches"]);
const vehiclesProductKeys = defineEnum(["automotive", "motorcycle"]);

export const productKeys = defineEnum([
	"smartphones",
	"laptops",
	"tablets",
	...watchesProductKeys,
	...vehiclesProductKeys,
]);

const getProductKey = <TKey extends (typeof productKeys)[number]>(key: TKey) => ({
	url: `/product/category/${key}` as const,
	withUrl: () => [key, { url: getProductKey(key).url }],
});

export const getProductQuery = <TKey extends (typeof productKeys)[number]>(key: TKey) => {
	return queryOptions({
		queryFn: () => callDummyApi(getProductKey(key).url),
		queryKey: getProductKey(key).withUrl(),
		select: (data: DummyResponseData) => data.products,
	});
};
