import { createFetcher } from "@/lib/core/create-fetcher";
import { BASE_AUTH_URL } from "@/lib/utils/constants";
import type { FormSchemaType } from "@/pages/AuthPage/components/FormArea/form.types";

type FormResponseDataType = {
	status: "success";
	accessToken: string;
	user: { name: string; email: string };
};

export type FormErrorResponseType =
	| { status: "error"; errors: Array<[keyof FormSchemaType, string | string[]]> }
	| { status: "error"; errorTitle: string; message: string; stackTrace: string };

const callMainApi = createFetcher<FormResponseDataType, FormErrorResponseType>({
	baseURL: BASE_AUTH_URL,

	body: {},

	method: "POST",

	retries: 3,

	credentials: "same-origin",

	defaultErrorMessage: "Failed to submit form",
});

export { callMainApi };
