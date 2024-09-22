import { callMainApi } from "@/lib/api/callMainApi";
import type { LoginSchema, SignUpSchema } from "@/lib/schemas/formSchema";
import { noScrollOnOpen } from "@/lib/utils/no-scroll-on-open";
import { isHTTPError } from "@zayne-labs/callapi/utils";
import type { UseFormReset, UseFormSetError } from "react-hook-form";
import type { NavigateFunction } from "react-router-dom";
import { z } from "zod";
import type { FormAreaProps } from "./FormArea";

export type FormSchemaType = z.infer<typeof LoginSchema> & z.infer<typeof SignUpSchema>;

type SubmitFormParams = {
	formType: FormAreaProps["formType"];
	navigate: NavigateFunction;
	reset: UseFormReset<FormSchemaType>;
	setError: UseFormSetError<FormSchemaType>;
};

const generateOnSubmitFn = (submitParams: SubmitFormParams) => {
	const { formType, navigate, reset, setError } = submitParams;

	const onSubmit = async (formDataObj: FormSchemaType) => {
		const AUTH_URL = formType === "Sign Up" ? `/sign-up` : `/login`;

		noScrollOnOpen({ isActive: true });

		const { error } = await callMainApi(AUTH_URL, { body: formDataObj });

		noScrollOnOpen({ isActive: false });

		if (isHTTPError(error) && "errors" in error.errorData) {
			const { errors: zodErrors } = error.errorData;

			zodErrors.forEach(([field, errorMessage]) => {
				setError(field, {
					message: Array.isArray(errorMessage) ? errorMessage.join(", ") : errorMessage,
					type: field,
				});
			});

			return;
		}

		if (isHTTPError(error) && "errorTitle" in error.errorData) {
			const errorResponse = error.errorData;

			setError("root.serverError", {
				message: errorResponse.message,
				type: errorResponse.errorTitle,
			});

			return;
		}

		if (error !== null) {
			setError("root.caughtError", {
				message: error.message,
				type: "caughtError",
			});

			return;
		}

		reset();
		navigate("/", { replace: true });
	};

	return onSubmit;
};

export { generateOnSubmitFn };
