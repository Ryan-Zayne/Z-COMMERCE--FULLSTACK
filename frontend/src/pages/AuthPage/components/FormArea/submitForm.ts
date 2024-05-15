import { callMainApi } from "@/lib/api/callMainApi";
import type { LoginSchema, SignUpSchema } from "@/lib/schemas/formSchema";
import { noScrollOnOpen } from "@/lib/utils/no-scroll-on-open";
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

const submitForm =
	({ formType, setError, reset, navigate }: SubmitFormParams) =>
	async (formDataObj: FormSchemaType) => {
		const AUTH_URL = formType === "Sign Up" ? `/sign-up` : `/login`;

		noScrollOnOpen({ isActive: true });

		const { errorInfo } = await callMainApi(AUTH_URL, {
			body: formDataObj,
		});

		noScrollOnOpen({ isActive: false });

		if (callMainApi.isHTTPError(errorInfo) && "errors" in errorInfo.errorData) {
			const { errors: zodErrors } = errorInfo.errorData;

			zodErrors.forEach(([field, errorMessage]) => {
				setError(field, {
					type: "serverZodErrors",
					message: Array.isArray(errorMessage) ? errorMessage.join(", ") : errorMessage,
				});
			});

			return;
		}

		if (callMainApi.isHTTPError(errorInfo) && "errorTitle" in errorInfo.errorData) {
			const errorResponse = errorInfo.errorData;

			setError("root.serverError", {
				type: errorResponse.errorTitle,
				message: errorResponse.message,
			});

			return;
		}

		if (errorInfo !== null) {
			setError("root.caughtError", {
				type: "caughtError",
				message: errorInfo.message,
			});

			return;
		}

		reset();
		navigate("/", { replace: true });
	};

export { submitForm };
