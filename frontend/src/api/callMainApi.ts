import { BASE_AUTH_URL } from "@/lib/utils/constants";
import { createFetcher } from "@/lib/utils/create-fetcher";
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

	defaultErrorMessage: "Failed to submit form",

	method: "POST",

	credentials: "same-origin",
});

export { callMainApi };
