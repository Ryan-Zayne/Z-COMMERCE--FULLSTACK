import { Button, LoadingSpinner } from "@/components/primitives";
import { useToggle } from "@/lib/hooks";
import { LoginSchema, SignUpSchema } from "@/lib/schemas/formSchema";
import { cnMerge } from "@/lib/utils/cn";
import { zodResolver } from "@hookform/resolvers/zod";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import FormErrorMessage from "../FormErrorMessage";
import InputGroup from "../InputGroup";
import { type FormSchemaType, submitForm } from "./submitForm";

export type FormAreaProps = {
	formType: "Login" | "Sign Up";
	formClasses?: string;
};

const semanticClasses = {
	error: "border-b-error focus-visible:border-b-error dark:focus-visible:border-b-error",
};

function FormArea({ formType, formClasses = "" }: FormAreaProps) {
	const navigate = useNavigate();
	const uniqueId = useId();
	const [isPasswordShow, togglePasswordShow] = useToggle(false);
	const [isConfirmPasswordShow, toggleConfirmPasswordShow] = useToggle(false);

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
				<InputGroup>
					<label htmlFor={`username__${uniqueId}`} className="text-label">
						Username
					</label>

					<input
						{...register("username")}
						autoComplete="username"
						type="text"
						name="username"
						id={`username__${uniqueId}`}
						className={cnMerge(
							`min-h-[3.2rem] border-b-[2px] border-b-carousel-btn bg-transparent text-input focus-visible:border-b-navbar dark:focus-visible:border-b-carousel-dot`,
							formState.errors.username && semanticClasses.error
						)}
					/>
					<FormErrorMessage formState={formState} type="regular" errorField="username" />
				</InputGroup>
			)}

			<InputGroup>
				<label htmlFor={`email__${uniqueId}`} className="text-label">
					Email address
				</label>

				<input
					{...register("email")}
					autoComplete="email"
					type="email"
					name="email"
					id={`email__${uniqueId}`}
					className={cnMerge(
						`min-h-[3.2rem] border-b-[2px] border-b-carousel-btn bg-transparent text-input focus-visible:border-b-navbar dark:focus-visible:border-b-carousel-dot`,
						formState.errors.email && semanticClasses.error
					)}
				/>

				<FormErrorMessage formState={formState} type="regular" errorField="email" />
			</InputGroup>

			<InputGroup className={"relative"}>
				<label htmlFor={`password__${uniqueId}`} className="text-label">
					Password
				</label>

				<input
					{...register("password")}
					type={isPasswordShow ? "text" : "password"}
					name="password"
					id={`password__${uniqueId}`}
					className={cnMerge(
						"min-h-[3.2rem] border-b-[2px] border-b-carousel-btn bg-transparent text-input  focus-visible:border-b-navbar dark:focus-visible:border-b-carousel-dot",
						formState.errors.password && semanticClasses.error
					)}
				/>

				<FormErrorMessage formState={formState} type="regular" errorField="password" />

				<button
					className="absolute right-[2rem] top-[2.3rem] text-[1.8rem]"
					type="button"
					onClick={togglePasswordShow}
				>
					{isPasswordShow ? <AiFillEyeInvisible /> : <AiFillEye />}
				</button>
			</InputGroup>

			{formType === "Sign Up" && (
				<InputGroup className={"relative"}>
					<label htmlFor={`confirmPassword__${uniqueId}`} className="text-label">
						Confirm Password
					</label>

					<input
						{...register("confirmPassword")}
						type={isConfirmPasswordShow ? "text" : "password"}
						name="confirmPassword"
						id={`confirmPassword__${uniqueId}`}
						className={cnMerge(
							"min-h-[3.2rem] border-b-[2px] border-b-carousel-btn bg-transparent text-input  focus-visible:border-b-navbar dark:focus-visible:border-b-carousel-dot",
							formState.errors.confirmPassword && semanticClasses.error
						)}
					/>

					<FormErrorMessage formState={formState} type="regular" errorField="confirmPassword" />

					<button
						className="absolute right-[2rem] top-[2.3rem] text-[1.8rem]"
						type="button"
						onClick={toggleConfirmPasswordShow}
					>
						{isConfirmPasswordShow ? <AiFillEyeInvisible /> : <AiFillEye />}
					</button>
				</InputGroup>
			)}

			<FormErrorMessage
				className={"mb-[-0.7rem] mt-[-1rem]  text-[1.3rem]"}
				formState={formState}
				type="root"
				errorField="serverError"
			/>

			<FormErrorMessage
				className={"mb-[-0.7rem] mt-[-1rem]  text-[1.3rem]"}
				formState={formState}
				type="root"
				errorField="caughtError"
			/>

			<InputGroup className={"flex flex-row gap-[1rem] text-[1.3rem] text-input"}>
				<input
					{...register(formType === "Sign Up" ? "acceptTerms" : "rememberMe")}
					type="checkbox"
					name={formType === "Sign Up" ? "acceptTerms" : "rememberMe"}
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
			</InputGroup>

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
