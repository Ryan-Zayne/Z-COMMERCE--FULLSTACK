import { callDummyApi } from "@/lib/api/callDummyApi";
import { callBackendApi } from "@/lib/api/callMainApi";
import { queryOptions } from "@tanstack/react-query";
import { defineEnum } from "@zayne-labs/toolkit/type-helpers";

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

export const keyFactory = {
	getProductKey: <TKey extends (typeof productKeys)[number]>(key: TKey) => ({
		url: `/product/category/${key}` as const,
		withUrl: () => [key, { url: keyFactory.getProductKey(key).url }],
	}),
	sessionKey: ["session"],
};

export const getProductQuery = <TKey extends (typeof productKeys)[number]>(key: TKey) => {
	return queryOptions({
		queryFn: () => callDummyApi(keyFactory.getProductKey(key).url),
		// eslint-disable-next-line tanstack-query/exhaustive-deps
		queryKey: keyFactory.getProductKey(key).withUrl(),
		select: (data) => data.products,
	});
};

export const getSessionQuery = () => {
	return queryOptions({
		queryFn: () => callBackendApi("/auth/session"),
		queryKey: keyFactory.sessionKey,
		select: (data) => data.data,
		staleTime: 1 * 60 * 1000,
	});
};
