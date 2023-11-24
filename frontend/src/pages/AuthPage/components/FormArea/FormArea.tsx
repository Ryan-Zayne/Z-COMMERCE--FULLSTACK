import { Button, LoadingSpinner } from '@/components/primitives/index.ts';
import { useToggle } from '@/lib/hooks/index.ts';
import { LoginSchema, SignUpSchema } from '@/lib/schemas/formSchema.ts';
import { cnMerge } from '@/lib/utils/cn.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { useId } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import ErrorParagraph from '../ErrorParagraph.tsx';
import InputGroup from '../InputGroup.tsx';
import type { FormSchemaType } from './form.types.ts';
import { submitForm } from './submitForm.ts';

export type FormAreaProps = {
	formType: 'Login' | 'Sign Up';
	formClasses?: string;
};

function FormArea({ formType, formClasses = '' }: FormAreaProps) {
	const navigate = useNavigate();
	const uniqueId = useId();
	const [isPasswordShow, togglePasswordShow] = useToggle(false);
	const [isConfirmPasswordShow, toggleConfirmPasswordShow] = useToggle(false);

	const {
		reset,
		setError,
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<FormSchemaType>({
		resolver: zodResolver(formType === 'Sign Up' ? SignUpSchema : LoginSchema),
	});

	const semanticClasses = {
		error: 'border-b-error focus-visible:border-b-error dark:focus-visible:border-b-error',
	};

	return (
		<form
			onSubmit={handleSubmit(submitForm({ formType, setError, reset, navigate }))}
			className={cnMerge(
				'mt-[2.5rem] flex flex-col gap-[1.8rem] [&_input]:text-[1.8rem] lg:[&_input]:text-[1.6rem] [&_label]:text-[1.2rem]',
				[formClasses]
			)}
		>
			{isSubmitting && <LoadingSpinner type={'auth'} />}

			{formType === 'Sign Up' && (
				<InputGroup>
					<label htmlFor={`username__${uniqueId}`} className="text-label">
						Username
					</label>

					<input
						{...register('username')}
						autoComplete="username"
						type="text"
						name="username"
						id={`username__${uniqueId}`}
						className={cnMerge(
							`min-h-[3.2rem] border-b-[2px] border-b-carousel-btn bg-transparent text-input focus-visible:border-b-navbar dark:focus-visible:border-b-carousel-dot`,
							errors?.username && semanticClasses.error
						)}
					/>
					{errors?.username && <ErrorParagraph message={errors.username.message} />}
				</InputGroup>
			)}

			<InputGroup>
				<label htmlFor={`email__${uniqueId}`} className="text-label">
					Email address
				</label>

				<input
					{...register('email')}
					autoComplete="email"
					type="email"
					name="email"
					id={`email__${uniqueId}`}
					className={cnMerge(
						`min-h-[3.2rem] border-b-[2px] border-b-carousel-btn bg-transparent text-input focus-visible:border-b-navbar dark:focus-visible:border-b-carousel-dot`,
						errors?.email && semanticClasses.error
					)}
				/>
				{errors?.email && <ErrorParagraph message={errors.email.message} />}
			</InputGroup>

			<InputGroup className={'relative'}>
				<label htmlFor={`password__${uniqueId}`} className="text-label">
					Password
				</label>

				<input
					{...register('password')}
					type={isPasswordShow ? 'text' : 'password'}
					name="password"
					id={`password__${uniqueId}`}
					className={cnMerge(
						'min-h-[3.2rem] border-b-[2px] border-b-carousel-btn bg-transparent text-input  focus-visible:border-b-navbar dark:focus-visible:border-b-carousel-dot',
						errors?.password && semanticClasses.error
					)}
				/>
				{errors?.password && <ErrorParagraph message={errors.password.message} />}

				<button
					className="absolute right-[2rem] top-[2.3rem] text-[1.8rem]"
					type="button"
					onClick={togglePasswordShow}
				>
					{isPasswordShow ? <AiFillEyeInvisible /> : <AiFillEye />}
				</button>
			</InputGroup>

			{formType === 'Sign Up' && (
				<InputGroup className={'relative'}>
					<label htmlFor={`confirmPassword__${uniqueId}`} className="text-label">
						Confirm Password
					</label>

					<input
						{...register('confirmPassword')}
						type={isConfirmPasswordShow ? 'text' : 'password'}
						name="confirmPassword"
						id={`confirmPassword__${uniqueId}`}
						className={cnMerge(
							'min-h-[3.2rem] border-b-[2px] border-b-carousel-btn bg-transparent text-input  focus-visible:border-b-navbar dark:focus-visible:border-b-carousel-dot',
							errors?.confirmPassword && semanticClasses.error
						)}
					/>
					{errors?.confirmPassword && <ErrorParagraph message={errors.confirmPassword.message} />}

					<button
						className="absolute right-[2rem] top-[2.3rem] text-[1.8rem]"
						type="button"
						onClick={toggleConfirmPasswordShow}
					>
						{isConfirmPasswordShow ? <AiFillEyeInvisible /> : <AiFillEye />}
					</button>
				</InputGroup>
			)}

			{errors.root?.serverError && (
				<ErrorParagraph
					className={'mb-[-0.7rem] mt-[-1rem]  text-[1.3rem]'}
					message={errors.root.serverError.message}
				/>
			)}
			{errors.root?.serverCaughtError && (
				<ErrorParagraph
					className={'mb-[-0.7rem] mt-[-1rem]  text-[1.3rem]'}
					message={errors.root.serverCaughtError.message}
				/>
			)}

			<InputGroup className={'flex flex-row gap-[1rem] text-[1.3rem] text-input'}>
				<input
					{...register(formType === 'Sign Up' ? 'acceptTerms' : 'rememberMe')}
					type="checkbox"
					name={formType === 'Sign Up' ? 'acceptTerms' : 'rememberMe'}
				/>

				{formType === 'Login' && <p>Remember me</p>}

				{formType === 'Sign Up' && (
					<>
						<p>
							I agree to all
							<Link
								to={' '}
								className={'ml-[0.5rem] font-[500] underline hover:text-[hsl(214,89%,53%)]'}
							>
								Terms & Conditions
							</Link>
						</p>
						{errors?.acceptTerms && <ErrorParagraph message={errors.acceptTerms.message} />}
					</>
				)}
			</InputGroup>

			<Button
				type={'submit'}
				text={formType}
				theme={'secondary'}
				disabled={isSubmitting}
				className={cnMerge(
					'mt-[1.5rem] rounded-[1rem] text-[1.7rem] font-[600]',
					isSubmitting && 'cursor-not-allowed brightness-[0.5]'
				)}
			/>
		</form>
	);
}

export default FormArea;
