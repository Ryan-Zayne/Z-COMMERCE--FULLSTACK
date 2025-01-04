import { Button, Form, LoadingSpinner, Show, Switch } from "@/components/primitives";
import {
	type FormErrorResponseType,
	type UserSessionData,
	callBackendApi,
} from "@/lib/api/callBackendApi";
import { type FormSchemaType, LoginSchema, SignUpSchema } from "@/lib/schemas/formSchema";
import { cnMerge } from "@/lib/utils/cn";
import { zodResolver } from "@hookform/resolvers/zod";
import { isHTTPError } from "@zayne-labs/callapi/utils";
import { lockScroll } from "@zayne-labs/toolkit/core";
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
		resolver: zodResolver(formVariant === "SignUp" ? SignUpSchema : LoginSchema),
	});

	const { control, formState, handleSubmit, setError } = methods;

	const onSubmit = async (formDataObj: FormSchemaType) => {
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

		if (formVariant === "SignUp") {
			void navigate("/auth/signin");
			return;
		}

		if (!data.data?.user.isEmailVerified) {
			void navigate("/auth/verify-email");
			return;
		}

		void navigate("/");
	};

	return (
		<Form.Root
			className={cnMerge(
				`mt-[2.5rem] flex flex-col gap-[1.8rem] [&_input]:text-[1.8rem] lg:[&_input]:text-[1.6rem]
				[&_label]:text-[1.2rem]`,
				classNames?.form
			)}
			methods={methods}
			onSubmit={(event) => void handleSubmit(onSubmit)(event)}
		>
			{formState.isSubmitting && <LoadingSpinner variant={"auth"} />}

			<Show when={formVariant === "SignUp"}>
				<Form.Item control={control} name="username">
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
				</Form.Item>
			</Show>

			<Form.Item control={control} name="email">
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
			</Form.Item>

			<Form.Item className="relative" control={control} name="password">
				<Form.Label>Password</Form.Label>

				<Form.Input
					classNames={{
						error: semanticClasses.error,
						inputGroup: `min-h-[3.2rem] border-b-[2px] border-b-carousel-btn bg-transparent
						text-input focus-within:border-b-navbar dark:focus-within:border-b-carousel-dot`,
					}}
					type="password"
				/>

				<Form.ErrorMessage control={control} className="text-error" errorField="password" />
			</Form.Item>

			<Show when={formVariant === "SignUp"}>
				<Form.Item className="relative" control={control} name="confirmPassword">
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
				</Form.Item>
			</Show>

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

			<Form.Item
				className="flex flex-row flex-wrap gap-x-[1rem] text-[1.3rem] text-input"
				control={control}
				name={formVariant === "SignUp" ? "acceptTerms" : "rememberMe"}
			>
				<Form.Input type="checkbox" />

				<Switch>
					<Switch.Match when={formVariant === "SignIn"}>
						<p>Remember me</p>
					</Switch.Match>

					<Switch.Match when={formVariant === "SignUp"}>
						<div className="flex">
							<p>I agree to all</p>

							<Link
								className={"ml-[0.5rem] font-[500] underline hover:text-[hsl(214,89%,53%)]"}
								to="#terms"
							>
								Terms & Conditions
							</Link>
						</div>

						<Form.ErrorMessage control={control} className="text-error" errorField="acceptTerms" />
					</Switch.Match>
				</Switch>
			</Form.Item>

			<Button
				className={cnMerge(
					"mt-[1.5rem] rounded-[1rem] text-[1.7rem] font-[600]",
					formState.isSubmitting && "cursor-not-allowed brightness-[0.5]"
				)}
				disabled={formState.isSubmitting}
				text={formVariant === "SignIn" ? "Sign In" : "Sign Up"}
				theme={"secondary"}
				type={"submit"}
			/>
		</Form.Root>
	);
}

export default FormArea;
