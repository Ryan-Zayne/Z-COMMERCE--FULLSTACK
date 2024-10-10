import { Button, Form, LoadingSpinner, Show, Switch } from "@/components/primitives";
import { LoginSchema, SignUpSchema } from "@/lib/schemas/formSchema";
import { cnMerge } from "@/lib/utils/cn";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { type FormSchemaType, generateOnSubmitFn } from "./generateOnSubmit";

export type FormAreaProps = {
	classNames?: { form?: string };
	formVariant: "SignIn" | "SignUp";
};

const semanticClasses = {
	error: "border-b-error focus-within:border-b-error dark:focus-within:border-b-error",
};

function FormArea({ classNames, formVariant }: FormAreaProps) {
	const navigate = useNavigate();

	const methods = useForm<FormSchemaType>({
		resolver: zodResolver(formVariant === "SignUp" ? SignUpSchema : LoginSchema),
	});

	const { control, formState, handleSubmit, reset, setError } = methods;

	const onSubmit = generateOnSubmitFn({ formVariant, navigate, reset, setError });

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
			{formState.isSubmitting && <LoadingSpinner type={"auth"} />}

			<Show when={formVariant === "SignUp"}>
				<Form.Item control={control} name="username">
					<Form.Label>Username</Form.Label>

					<Form.Input
						className="min-h-[3.2rem] border-b-[2px] border-b-carousel-btn bg-transparent text-input
							focus-within:border-b-navbar dark:focus-within:border-b-carousel-dot"
						errorClassName={semanticClasses.error}
						type="text"
					/>

					<Form.ErrorMessage control={control} errorField="username" type="regular" />
				</Form.Item>
			</Show>

			<Form.Item control={control} name="email">
				<Form.Label>Email address</Form.Label>

				<Form.Input
					className="min-h-[3.2rem] border-b-[2px] border-b-carousel-btn bg-transparent text-input
						focus-within:border-b-navbar dark:focus-within:border-b-carousel-dot"
					errorClassName={semanticClasses.error}
					type="email"
				/>

				<Form.ErrorMessage control={control} errorField="email" type="regular" />
			</Form.Item>

			<Form.Item className="relative" control={control} name="password">
				<Form.Label>Password</Form.Label>

				<Form.Input
					classNames={{
						inputGroup: `min-h-[3.2rem] border-b-[2px] border-b-carousel-btn bg-transparent
						text-input focus-within:border-b-navbar dark:focus-within:border-b-carousel-dot`,
					}}
					errorClassName={semanticClasses.error}
					type="password"
				/>

				<Form.ErrorMessage control={control} errorField="password" type="regular" />
			</Form.Item>

			<Show when={formVariant === "SignUp"}>
				<Form.Item className="relative" control={control} name="confirmPassword">
					<Form.Label>Confirm Password</Form.Label>

					<Form.Input
						classNames={{
							inputGroup: `min-h-[3.2rem] border-b-[2px] border-b-carousel-btn bg-transparent
							text-input focus-within:border-b-navbar dark:focus-within:border-b-carousel-dot`,
						}}
						errorClassName={semanticClasses.error}
						type="password"
					/>

					<Form.ErrorMessage control={control} errorField="confirmPassword" type="regular" />
				</Form.Item>
			</Show>

			<Form.ErrorMessage
				className="mb-[-0.7rem] mt-[-1rem] text-[1.3rem]"
				errorField="serverError"
				type="root"
			/>

			<Form.ErrorMessage
				className={"mb-[-0.7rem] mt-[-1rem] text-[1.3rem]"}
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

						<Form.ErrorMessage control={control} errorField="acceptTerms" type="regular" />
					</Switch.Match>
				</Switch>
			</Form.Item>

			<Button
				className={cnMerge(
					"mt-[1.5rem] rounded-[1rem] text-[1.7rem] font-[600]",
					formState.isSubmitting && "cursor-not-allowed brightness-[0.5]"
				)}
				disabled={formState.isSubmitting}
				text={formVariant}
				theme={"secondary"}
				type={"submit"}
			/>
		</Form.Root>
	);
}

export default FormArea;
