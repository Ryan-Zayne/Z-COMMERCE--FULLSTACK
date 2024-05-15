import { Button, LoadingSpinner } from "@/components/primitives";
import { useToggle } from "@/lib/hooks";
import { LoginSchema, SignUpSchema } from "@/lib/schemas/formSchema";
import { cnJoin, cnMerge } from "@/lib/utils/cn";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import FormErrorMessage from "../FormErrorMessage";
import Form from "../FormGroup";
import { type FormSchemaType, submitForm } from "./submitForm";

export type FormAreaProps = {
	formType: "Login" | "Sign Up";
	formClasses?: string;
};

const semanticClasses = {
	error: "border-b-error focus-visible:border-b-error dark:focus-visible:border-b-error",
};

function FormArea({ formType, formClasses }: FormAreaProps) {
	const [isPasswordShow, togglePasswordShow] = useToggle(false);
	const [isConfirmPasswordShow, toggleConfirmPasswordShow] = useToggle(false);
	const navigate = useNavigate();

	const { reset, setError, register, handleSubmit, formState } = useForm<FormSchemaType>({
		resolver: zodResolver(formType === "Sign Up" ? SignUpSchema : LoginSchema),
	});

	return (
		<form
			onSubmit={(event) => {
				void handleSubmit(submitForm({ formType, setError, reset, navigate }))(event);
			}}
			className={cnMerge(
				"mt-[2.5rem] flex flex-col gap-[1.8rem] [&_input]:text-[1.8rem] lg:[&_input]:text-[1.6rem] [&_label]:text-[1.2rem]",
				[formClasses]
			)}
		>
			{formState.isSubmitting && <LoadingSpinner type={"auth"} />}

			{formType === "Sign Up" && (
				<Form.Group>
					<Form.Label>Username</Form.Label>

					<Form.Input
						{...register("username")}
						type="text"
						className={cnJoin(formState.errors.username && semanticClasses.error)}
					/>
					<FormErrorMessage formState={formState} type="regular" errorField="username" />
				</Form.Group>
			)}

			<Form.Group>
				<Form.Label>Email address</Form.Label>

				<Form.Input
					{...register("email")}
					type="email"
					className={cnJoin(formState.errors.email && semanticClasses.error)}
				/>

				<FormErrorMessage formState={formState} type="regular" errorField="email" />
			</Form.Group>

			<Form.Group className={"relative"}>
				<Form.Label>Password</Form.Label>

				<Form.Input
					{...register("password")}
					type={isPasswordShow ? "text" : "password"}
					className={cnJoin(formState.errors.password && semanticClasses.error)}
				/>

				<FormErrorMessage formState={formState} type="regular" errorField="password" />

				<button
					className="absolute right-[2rem] top-[2.3rem] text-[1.8rem]"
					type="button"
					onClick={togglePasswordShow}
				>
					{isPasswordShow ? <AiFillEyeInvisible /> : <AiFillEye />}
				</button>
			</Form.Group>

			{formType === "Sign Up" && (
				<Form.Group className={"relative"}>
					<Form.Label>Confirm Password</Form.Label>

					<Form.Input
						{...register("confirmPassword")}
						type={isConfirmPasswordShow ? "text" : "password"}
						className={cnJoin(formState.errors.confirmPassword && semanticClasses.error)}
					/>

					<FormErrorMessage formState={formState} type="regular" errorField="confirmPassword" />

					<button
						className="absolute right-[2rem] top-[2.3rem] text-[1.8rem]"
						type="button"
						onClick={toggleConfirmPasswordShow}
					>
						{isConfirmPasswordShow ? <AiFillEyeInvisible /> : <AiFillEye />}
					</button>
				</Form.Group>
			)}

			<FormErrorMessage
				className={"mb-[-0.7rem] mt-[-1rem]  text-[1.3rem]"}
				type="root"
				formState={formState}
				errorField="serverError"
			/>

			<FormErrorMessage
				className={"mb-[-0.7rem] mt-[-1rem]  text-[1.3rem]"}
				type="root"
				formState={formState}
				errorField="caughtError"
			/>

			<Form.Group className={"flex flex-row gap-[1rem] text-[1.3rem] text-input"}>
				<Form.Input
					{...register(formType === "Sign Up" ? "acceptTerms" : "rememberMe")}
					type="checkbox"
				/>

				{formType === "Login" && <p>Remember me</p>}

				{formType === "Sign Up" && (
					<>
						<p>
							I agree to all
							<Link
								to=" "
								className={"ml-[0.5rem] font-[500] underline hover:text-[hsl(214,89%,53%)]"}
							>
								Terms & Conditions
							</Link>
						</p>

						<FormErrorMessage formState={formState} type="regular" errorField="acceptTerms" />
					</>
				)}
			</Form.Group>

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
		</form>
	);
}

export default FormArea;
