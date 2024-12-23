import { callMainApi } from "@/lib/api/callMainApi";
import type { FormSchemaType } from "@/lib/schemas/formSchema";
import { noScrollOnOpen } from "@/lib/utils/no-scroll-on-open";
import type { QueryClient } from "@tanstack/react-query";
import { isHTTPError } from "@zayne-labs/callapi/utils";
import type { UseFormReset, UseFormSetError } from "react-hook-form";
import type { NavigateFunction } from "react-router-dom";
import type { FormAreaProps } from "./FormArea";

type SubmitFormParams = {
	formVariant: FormAreaProps["formVariant"];
	navigate: NavigateFunction;
	queryClient: QueryClient;
	reset: UseFormReset<FormSchemaType>;
	setError: UseFormSetError<FormSchemaType>;
};

const typedObjectEntries = <TObject extends Record<string, unknown>>(obj: TObject) => {
	return Object.entries(obj) as Array<[keyof TObject, TObject[keyof TObject]]>;
};

const createOnSubmitFn = (submitParams: SubmitFormParams) => {
	const { formVariant, navigate, setError } = submitParams;

	const onSubmit = async (formDataObj: FormSchemaType) => {
		const AUTH_URL = formVariant === "SignUp" ? `/signup` : `/signin`;

		noScrollOnOpen({ isActive: true });

		const { error } = await callMainApi(AUTH_URL, { body: formDataObj });

		noScrollOnOpen({ isActive: false });

		if (isHTTPError(error) && "errors" in error.errorData) {
			const zodErrorDetails = error.errorData.errors;

			setError("root.serverError", {
				message: zodErrorDetails.formErrors as never,
			});

			typedObjectEntries(zodErrorDetails.fieldErrors).forEach(([field, errorMessage]) => {
				setError(field, {
					message: errorMessage as never,
				});
			});

			return;
		}

		if (isHTTPError(error)) {
			const errorResponse = error.errorData;

			setError("root.serverError", {
				message: errorResponse.message,
			});

			return;
		}

		if (error) {
			setError("root.caughtError", {
				message: error.message,
			});

			return;
		}

		// navigate("/", { replace: true });
	};

	return onSubmit;
};

export { createOnSubmitFn };
