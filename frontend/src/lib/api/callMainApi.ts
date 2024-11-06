import { BASE_API_URL, BASE_AUTH_URL } from "@/lib/utils/constants";
import { createFetchClient } from "@zayne-labs/callapi";
import type { FormSchemaType } from "../schemas/formSchema";

type BaseApiSuccessType = {
	message: string;
	status: "success";
};

type UserSessionResponse = BaseApiSuccessType & {
	data: {
		user: Record<string, unknown>;
	};
};

type BaseApiErrorType = {
	message: string;
	stackTrace: string;
	status: "error";
};

type ApiErrorType<TError> = BaseApiErrorType & { errors: TError };

export type FormErrorResponseType =
	| ApiErrorType<{
			fieldErrors: Array<[keyof FormSchemaType, string | string[]]>;
			formErrors: string[];
	  }>
	| BaseApiErrorType;

const callMainApi = createFetchClient<UserSessionResponse, FormErrorResponseType>({
	baseURL: BASE_AUTH_URL,
	credentials: "same-origin",
	defaultErrorMessage: "Failed to submit form",
	method: "POST",
});

export const callBackendApi = createFetchClient<UserSessionResponse, BaseApiErrorType, "onlySuccess">({
	baseURL: BASE_API_URL,
	credentials: "same-origin",
	onResponseError: ({ response }) => {
		if (response.status === 401) {
			window.location.href = "/auth/signin";
		}
	},
	resultMode: "onlySuccess",
	throwOnError: true,
});

export { callMainApi };
