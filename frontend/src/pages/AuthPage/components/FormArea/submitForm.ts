import { callMainApi } from "@/api/callMainApi";
import { noScrollOnOpen } from "@/lib/utils/no-scroll-on-open";
import type { UseFormReset, UseFormSetError } from "react-hook-form";
import type { NavigateFunction } from "react-router-dom";
import type { FormAreaProps } from "./FormArea";
import type { FormSchemaType } from "./form.types";

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

		const { dataInfo, errorInfo } = await callMainApi(AUTH_URL, {
			body: formDataObj,
		});

		noScrollOnOpen({ isActive: false });

		if (errorInfo?.response && "errors" in errorInfo.response) {
			const { errors: zodErrors } = errorInfo.response;

			zodErrors.forEach(([field, errorMessage]) => {
				setError(field, {
					type: "serverZodErrors",
					message: Array.isArray(errorMessage) ? errorMessage.join(", ") : errorMessage,
				});
			});

			return;
		}

		if (errorInfo?.response && "errorTitle" in errorInfo.response) {
			const errorResponse = errorInfo.response;

			setError("root.serverError", {
				type: errorResponse.errorTitle,
				message: errorResponse.message,
			});

			return;
		}

		if (!dataInfo) {
			setError("root.serverCaughtError", {
				type: "serverCaughtError",
				message: errorInfo.message,
			});

			return;
		}

		reset();
		navigate("/", { replace: true });
	};

export { submitForm };
