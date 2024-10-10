import { BASE_AUTH_URL } from "@/lib/utils/constants";
import type { FormSchemaType } from "@/pages/AuthPage/components/FormArea";
import { createFetchClient } from "@zayne-labs/callapi";

type FormResponseDataType = {
	accessToken: string;
	status: "success";
	user: { email: string; name: string };
};

export type FormErrorResponseType =
	| {
			errors: {
				fieldErrors: Array<[keyof FormSchemaType, string | string[]]>;
				formErrors: string[];
			};
			errorTitle: string;
			message: string;
			stackTrace: string;
			status: "error";
	  }
	| {
			errorTitle: string;
			message: string;
			stackTrace: string;
			status: "error";
	  };

const callMainApi = createFetchClient<FormResponseDataType, FormErrorResponseType>({
	baseURL: BASE_AUTH_URL,
	credentials: "same-origin",
	defaultErrorMessage: "Failed to submit form",
	method: "POST",
});

export { callMainApi };
