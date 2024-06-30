import { callMainApi } from "@/lib/api/callMainApi";
import type { LoginSchema, SignUpSchema } from "@/lib/schemas/formSchema";
import { noScrollOnOpen } from "@/lib/utils/no-scroll-on-open";
import { isHTTPError } from "@zayne-labs/callapi";
import type { UseFormReset, UseFormSetError } from "react-hook-form";
import type { NavigateFunction } from "react-router-dom";
import { z } from "zod";
import type { FormAreaProps } from "./FormArea";

export type FormSchemaType = z.infer<typeof SignUpSchema> & z.infer<typeof LoginSchema>;

type SubmitFormParams = {
	formType: FormAreaProps["formType"];
	setError: UseFormSetError<FormSchemaType>;
	reset: UseFormReset<FormSchemaType>;
	navigate: NavigateFunction;
};

const generateOnSubmit = (submitParams: SubmitFormParams) => {
	const { formType, setError, reset, navigate } = submitParams;

	const onSubmit = async (formDataObj: FormSchemaType) => {
		const AUTH_URL = formType === "Sign Up" ? `/sign-up` : `/login`;

		noScrollOnOpen({ isActive: true });

		const { error } = await callMainApi(AUTH_URL, { body: formDataObj });

		noScrollOnOpen({ isActive: false });

		if (isHTTPError(error) && "errors" in error.errorData) {
			const { errors: zodErrors } = error.errorData;

			zodErrors.forEach(([field, errorMessage]) => {
				setError(field, {
					type: "serverZodErrors",
					message: Array.isArray(errorMessage) ? errorMessage.join(", ") : errorMessage,
				});
			});

			return;
		}

		if (isHTTPError(error) && "errorTitle" in error.errorData) {
			const errorResponse = error.errorData;

			setError("root.serverError", {
				type: errorResponse.errorTitle,
				message: errorResponse.message,
			});

			return;
		}

		if (error !== null) {
			setError("root.caughtError", {
				type: "caughtError",
				message: error.message,
			});

			return;
		}

		reset();
		navigate("/", { replace: true });
	};

	return onSubmit;
};

export { generateOnSubmit };
