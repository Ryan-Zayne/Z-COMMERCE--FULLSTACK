import { Button, LoadingSpinner, Show, Switch } from "@/components/primitives";
import { LoginSchema, SignUpSchema } from "@/lib/schemas/formSchema";
import { cnMerge } from "@/lib/utils/cn";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Form from "../Form";
import { type FormSchemaType, generateOnSubmit } from "./generateOnSubmit";

export type FormAreaProps = {
	formType: "Login" | "Sign Up";
	formClasses?: string;
};

const semanticClasses = {
	error: "border-b-error focus-visible:border-b-error dark:focus-visible:border-b-error",
};

function FormArea({ formType, formClasses }: FormAreaProps) {
	const navigate = useNavigate();

	const methods = useForm<FormSchemaType>({
		resolver: zodResolver(formType === "Sign Up" ? SignUpSchema : LoginSchema),
	});

	const { reset, setError, handleSubmit, control, formState } = methods;

	const onSubmit = generateOnSubmit({ formType, setError, reset, navigate });

	return (
		<Form.Root
			methods={methods}
			onSubmit={(event) => void handleSubmit(onSubmit)(event)}
			className={cnMerge(
				`mt-[2.5rem] flex flex-col gap-[1.8rem] [&_input]:text-[1.8rem] lg:[&_input]:text-[1.6rem]
				[&_label]:text-[1.2rem]`,
				[formClasses]
			)}
		>
			{formState.isSubmitting && <LoadingSpinner type={"auth"} />}

			<Show when={formType === "Sign Up"}>
				<Form.Item control={control} name="username">
					<Form.Label>Username</Form.Label>

					<Form.Input type="text" errorClassName={semanticClasses.error} />

					<Form.ErrorMessage control={control} type="regular" errorField="username" />
				</Form.Item>
			</Show>

			<Form.Item control={control} name="email">
				<Form.Label>Email address</Form.Label>

				<Form.Input type="email" errorClassName={semanticClasses.error} />

				<Form.ErrorMessage control={control} type="regular" errorField="email" />
			</Form.Item>

			<Form.Item control={control} name="password" className="relative">
				<Form.Label>Password</Form.Label>

				<Form.Input type={"password"} errorClassName={semanticClasses.error} />

				<Form.ErrorMessage control={control} type="regular" errorField="password" />
			</Form.Item>

			<Show when={formType === "Sign Up"}>
				<Form.Item control={control} name="confirmPassword" className={"relative"}>
					<Form.Label>Confirm Password</Form.Label>

					<Form.Input type={"password"} errorClassName={semanticClasses.error} />

					<Form.ErrorMessage control={control} type="regular" errorField="confirmPassword" />
				</Form.Item>
			</Show>

			<Form.ErrorMessage
				className={"mb-[-0.7rem] mt-[-1rem] text-[1.3rem]"}
				type="root"
				errorField="serverError"
			/>

			<Form.ErrorMessage
				className={"mb-[-0.7rem] mt-[-1rem] text-[1.3rem]"}
				type="root"
				errorField="caughtError"
			/>

			<Form.Item
				control={control}
				name={formType === "Sign Up" ? "acceptTerms" : "rememberMe"}
				className={"flex flex-row gap-[1rem] text-[1.3rem] text-input"}
			>
				<Form.Input type="checkbox" />

				<Switch>
					<Switch.Match when={formType === "Login"}>
						<p>Remember me</p>
					</Switch.Match>

					<Switch.Match when={formType === "Sign Up"}>
						<div className="flex">
							<p>I agree to all</p>

							<Link
								to="#terms"
								className={"ml-[0.5rem] font-[500] underline hover:text-[hsl(214,89%,53%)]"}
							>
								Terms & Conditions
							</Link>
						</div>

						<Form.ErrorMessage control={control} type="regular" errorField="acceptTerms" />
					</Switch.Match>
				</Switch>
			</Form.Item>

			<Button
				type={"submit"}
				text={formType}
				theme={"secondary"}
				disabled={formState.isSubmitting}
				className={cnMerge(
					"mt-[1.5rem] rounded-[1rem] text-[1.7rem] font-[600]",
					formState.isSubmitting && "cursor-not-allowed brightness-[0.5]"
				)}
			/>
		</Form.Root>
	);
}

export default FormArea;
