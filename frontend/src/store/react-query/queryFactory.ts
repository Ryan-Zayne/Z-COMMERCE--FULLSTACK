import {
	type ApiSuccessType,
	type UserSessionData,
	callBackendApiForQuery,
} from "@/lib/api/callBackendApi";
import { callDummyApi } from "@/lib/api/callDummyApi";
import { hardNavigate } from "@/lib/utils/hardNavigate";
import { queryOptions } from "@tanstack/react-query";
import type { CallApiExtraOptions } from "@zayne-labs/callapi";
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

export const productQuery = <TKey extends (typeof productKeys)[number]>(key: TKey) => {
	const url = `/products/category/${key}`;

	const productKey = [key, { url }];

	return queryOptions({
		queryFn: () => callDummyApi(url),
		queryKey: productKey,
		select: (data) => data?.products,
	});
};

export const sessionQuery = (
	options?: Pick<
		CallApiExtraOptions<ApiSuccessType<UserSessionData>>,
		"meta" | "onRequestError" | "onResponseError" | "onSuccess"
	>
) => {
	const sessionKey = ["session", options?.meta];

	return queryOptions({
		queryFn: () =>
			callBackendApiForQuery<UserSessionData>("/auth/session", {
				meta: { redirectOn404Error: false, ...options?.meta },
				onRequestError: options?.onRequestError,
				onResponseError: options?.onResponseError,
				onSuccess: options?.onSuccess,
			}),
		// eslint-disable-next-line tanstack-query/exhaustive-deps -- Disabled cuz functions cannot be serialized
		queryKey: sessionKey,
		retry: false,
		select: (data) => data?.data,
		staleTime: 1 * 60 * 1000,
	});
};

export const verifyEmailQuery = (token: string | undefined) => {
	const verifyEmailKey = ["verify-email", { token }];

	return queryOptions({
		enabled: Boolean(token),
		queryFn: async () => {
			const sessionQueryData = await useQueryClientStore
				.getState()
				.queryClient.ensureQueryData(sessionQuery());

			if (sessionQueryData?.data?.user.isEmailVerified) {
				hardNavigate("/auth/verify-email/success");
				return;
			}

			return callBackendApiForQuery("/auth/verify-email", {
				body: { token },
				meta: { redirectOn404Error: false },
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
		queryKey: verifyEmailKey,
		retry: false,
	});
};
