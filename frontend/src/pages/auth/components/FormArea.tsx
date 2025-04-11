import { Button, Form, Show, Switch } from "@/components/primitives";
import {
	type FormErrorResponseType,
	type UserSessionData,
	callBackendApi,
} from "@/lib/api/callBackendApi";
import { type FormSchemaType, LoginSchema, SignUpSchema } from "@/lib/schemas/formSchema";
import { cnMerge } from "@/lib/utils/cn";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { isHTTPError } from "@zayne-labs/callapi/utils";
import { lockScroll } from "@zayne-labs/toolkit-core";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

export type FormAreaProps = {
	classNames?: { form?: string };
	formVariant: "SignIn" | "SignUp";
};

const semanticClasses = {
	error: "border-b-error focus-within:border-b-error dark:focus-within:border-b-error",
};

const typedObjectEntries = <TObject extends Record<string, unknown>>(obj: TObject) => {
	return Object.entries(obj) as Array<[keyof TObject, TObject[keyof TObject]]>;
};

function FormArea({ classNames, formVariant }: FormAreaProps) {
	const navigate = useNavigate();

	const methods = useForm<FormSchemaType>({
		resolver: standardSchemaResolver((formVariant === "SignUp" ? SignUpSchema : LoginSchema) as never),
	});

	const { control, handleSubmit, setError } = methods;

	const onSubmit = handleSubmit(async (formDataObj) => {
		lockScroll({ isActive: true });

		const AUTH_URL = formVariant === "SignUp" ? `/auth/signup` : `/auth/signin`;

		const { data, error } = await callBackendApi<UserSessionData, FormErrorResponseType>(AUTH_URL, {
			body: formDataObj,
			method: "POST",
		});

		lockScroll({ isActive: false });

		if (isHTTPError(error) && error.errorData.errors) {
			const zodErrorDetails = error.errorData.errors;

			// == My Form.ErrorMessage component handles arrays as messages, hence the need for this cast
			setError("root.serverError", {
				message: zodErrorDetails.formErrors as unknown as string,
			});

			typedObjectEntries(zodErrorDetails.fieldErrors).forEach(([field, errorMessage]) => {
				setError(field, {
					message: errorMessage as unknown as string,
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

		if (!data.data?.user.isEmailVerified) {
			void navigate("/auth/verify-email");
			return;
		}

		void navigate("/");
	});

	return (
		<Form.Root
			methods={methods}
			className={cnMerge(
				`mt-[2.5rem] flex flex-col gap-[1.8rem] [&_input]:text-[1.4rem] lg:[&_input]:text-[1.6rem]
				[&_label]:text-[1.2rem]`,
				classNames?.form
			)}
			onSubmit={(event) => void onSubmit(event)}
		>
			<Show.Root when={formVariant === "SignUp"}>
				<Form.Field control={control} name="username">
					<Form.Label>Username</Form.Label>

					<Form.Input
						classNames={{
							error: semanticClasses.error,
							input: `min-h-[3.2rem] border-b-[2px] border-b-carousel-btn bg-transparent text-input
							focus-within:border-b-navbar dark:focus-within:border-b-carousel-dot`,
						}}
						type="text"
					/>

					<Form.ErrorMessage control={control} className="text-error" errorField="username" />
				</Form.Field>
			</Show.Root>

			<Form.Field control={control} name="email">
				<Form.Label>Email address</Form.Label>

				<Form.Input
					classNames={{
						error: semanticClasses.error,
						input: `min-h-[3.2rem] border-b-[2px] border-b-carousel-btn bg-transparent text-input
						focus-within:border-b-navbar dark:focus-within:border-b-carousel-dot`,
					}}
					type="email"
				/>

				<Form.ErrorMessage control={control} className="text-error" errorField="email" />
			</Form.Field>

			<Form.Field className="relative" control={control} name="password">
				<Form.Label>Password</Form.Label>

				<Form.Input
					classNames={{
						error: semanticClasses.error,
						input: "min-h-[3.2rem]",
						inputGroup: `border-b-[2px] border-b-carousel-btn bg-transparent text-input
						focus-within:border-b-navbar dark:focus-within:border-b-carousel-dot`,
					}}
					type="password"
				/>

				<Form.ErrorMessage control={control} className="text-error" errorField="password" />
			</Form.Field>

			<Show.Root when={formVariant === "SignUp"}>
				<Form.Field className="relative" control={control} name="confirmPassword">
					<Form.Label>Confirm Password</Form.Label>

					<Form.Input
						classNames={{
							error: semanticClasses.error,
							inputGroup: `min-h-[3.2rem] border-b-[2px] border-b-carousel-btn bg-transparent
							text-input focus-within:border-b-navbar dark:focus-within:border-b-carousel-dot`,
						}}
						type="password"
					/>

					<Form.ErrorMessage control={control} className="text-error" errorField="confirmPassword" />
				</Form.Field>
			</Show.Root>

			<Form.ErrorMessage
				className="mb-[-0.7rem] mt-[-1rem] text-error"
				errorField="serverError"
				type="root"
			/>

			<Form.ErrorMessage
				className="mb-[-0.7rem] mt-[-1rem] text-error"
				errorField="caughtError"
				type="root"
			/>

			<Form.Field
				className="flex flex-row flex-wrap gap-x-[1rem] text-[1.3rem] text-input"
				control={control}
				name={formVariant === "SignUp" ? "acceptTerms" : "rememberMe"}
			>
				<Form.Input type="checkbox" />

				<Switch.Root condition={formVariant}>
					<Switch.Match when="SignIn">
						<Form.Label>Remember me</Form.Label>
					</Switch.Match>

					<Switch.Match when="SignUp">
						<div className="flex">
							<Form.Label>
								I agree to all
								<Link
									className="ml-[0.5rem] font-[500] underline hover:text-[hsl(214,89%,53%)]"
									to="#terms"
								>
									Terms & Conditions
								</Link>
							</Form.Label>
						</div>

						<Form.ErrorMessage control={control} className="text-error" />
					</Switch.Match>
				</Switch.Root>
			</Form.Field>

			<Form.SubscribeToFormState
				render={({ isSubmitting }) => (
					<Button
						className={cnMerge(
							"mt-[1.5rem] rounded-[1rem] text-[1.7rem] font-[600]",
							isSubmitting && "cursor-not-allowed brightness-[0.5]"
						)}
						isLoading={isSubmitting}
						disabled={isSubmitting}
						theme="secondary"
						type="submit"
					>
						{formVariant === "SignIn" ? "Sign In" : "Sign Up"}
					</Button>
				)}
			/>
		</Form.Root>
	);
}

export default FormArea;
