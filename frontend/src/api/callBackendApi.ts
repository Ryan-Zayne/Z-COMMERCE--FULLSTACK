import { BASE_AUTH_URL } from "@/lib/utils/constants.ts";
import type { HTTPError } from "@/lib/utils/create-fetcher/create-fetcher.utils.ts";
import { createFetcher } from "@/lib/utils/create-fetcher/index.ts";
import type { FormSchemaType } from "@/pages/AuthPage/components/FormArea/form.types.ts";

type FormResponseDataType = {
	status: "success";
	accessToken: string;
	user: { name: string; email: string };
};

export type FormErrorResponseType =
	| { status: "error"; errors: Array<[keyof FormSchemaType, string | string[]]> }
	| { status: "error"; errorTitle: string; message: string; stackTrace: string };

const callBackendApi = createFetcher<FormResponseDataType, HTTPError<FormErrorResponseType>>({
	baseURL: BASE_AUTH_URL,

	defaultErrorMessage: "Failed to submit form",

	method: "POST",

	credentials: "same-origin",
});

export { callBackendApi };
