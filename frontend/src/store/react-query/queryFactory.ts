import { type UserSessionData, callBackendApiForQuery } from "@/lib/api/callBackendApi";
import { callDummyApi } from "@/lib/api/callDummyApi";
import { hardNavigate } from "@/lib/utils/hardNavigate";
import { queryOptions } from "@tanstack/react-query";
import { defineEnum } from "@zayne-labs/toolkit/type-helpers";
import { toast } from "sonner";
import { useQueryClientStore } from "./queryClientStore";

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
	}),
	getVerifyEmailKey: (token: string | undefined) => ["verify-email", { token }] as const,
	sessionKey: ["session"] as const,
};

export const productQuery = <TKey extends (typeof productKeys)[number]>(key: TKey) => {
	return queryOptions({
		queryFn: () => callDummyApi(keyFactory.getProductKey(key).url),
		queryKey: [key, { url: keyFactory.getProductKey(key).url }],
		select: (data) => data.products,
	});
};

export const sessionQuery = () => {
	return queryOptions({
		queryFn: () => callBackendApiForQuery<UserSessionData>("/auth/session"),
		queryKey: keyFactory.sessionKey,
		retry: false,
		select: (data) => data.data,
		staleTime: 1 * 60 * 1000,
	});
};

export const verifyEmailQuery = (token: string | undefined) => {
	return queryOptions({
		enabled: Boolean(token),
		queryFn: async () => {
			const sessionQueryResult = await useQueryClientStore
				.getState()
				.queryClient.ensureQueryData(sessionQuery());

			if (sessionQueryResult.data?.user.isEmailVerified) {
				hardNavigate("/auth/verify-email/success");
				return;
			}

			return callBackendApiForQuery("/auth/verify-email", {
				body: { token },
				meta: { skip404Redirect: true },
				method: "POST",

				onError: ({ error }) => {
					toast.error(error.message);
					// void navigate("/auth/verify-email");
				},

				onSuccess: ({ data }) => {
					toast.success(data.message);
					hardNavigate("/auth/verify-email/success");
				},
			});
		},
		queryKey: keyFactory.getVerifyEmailKey(token),
		retry: false,
	});
};
