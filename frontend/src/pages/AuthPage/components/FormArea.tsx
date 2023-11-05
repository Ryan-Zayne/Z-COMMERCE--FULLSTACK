import { Button } from '@/components';
import Loader from '@/components/Loader';
import { useToggle } from '@/hooks';
import { LoginSchema, SignUpSchema } from '@/lib/schemas/formSchema';
import { BASE_AUTH_URL } from '@/lib/utils/constants';
import { noScrollOnOpen } from '@/lib/utils/no-scroll-on-open';
import { zodResolver } from '@hookform/resolvers/zod';
import { useId } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import type { FormSchemaType } from '../form.types';
import ErrorParagraph from './ErrorParagraph';
import InputGroup from './InputGroup';

type FormAreaProps = {
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

	const submitForm = async (data: FormSchemaType) => {
		noScrollOnOpen({ isOpen: true });

		try {
			const AUTH_URL = formType === 'Sign Up' ? `${BASE_AUTH_URL}/sign-up` : `${BASE_AUTH_URL}/login`;

			const response = await fetch(AUTH_URL, {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			const responseData = await response.json();

			if (responseData.errors) {
				const zodErrors = Object.entries(responseData.errors as FormSchemaType);

				zodErrors.forEach(([field, errorMessage]) => {
					setError(field as keyof FormSchemaType, {
						type: 'serverZodErrors',
						message: String(errorMessage),
					});
				});

				return;
			}

			if (response.status >= 400) {
				setError('root.serverError', {
					type: response.statusText,
					message: responseData.message,
				});

				return;
			}

			if (!response.ok) {
				throw new Error(responseData.message);
			}

			reset();
			navigate('/', { replace: true });

			// Handle caught server errors
		} catch (error) {
			if (error instanceof Error) {
				setError('root.serverCatch', {
					type: error.name,
					message: 'Something went wrong',
				});
				// eslint-disable-next-line no-console
				console.error(error.message);
			}

			// Renable scrolling after submit or error
		} finally {
			noScrollOnOpen({ isOpen: false });
		}
	};

	const errorClasses = 'border-b-error focus-visible:border-b-error dark:focus-visible:border-b-error';

	return (
		<form
			onSubmit={handleSubmit(submitForm)}
			className={twMerge(
				'mt-[2.5rem] flex flex-col gap-[1.8rem] [&_input]:text-[1.8rem] lg:[&_input]:text-[1.6rem] [&_label]:text-[1.2rem]',
				[formClasses]
			)}
		>
			{isSubmitting && <Loader type={'auth'} />}
			{formType === 'Sign Up' && (
				<InputGroup>
					<label htmlFor={`username__${uniqueId}`} className="text-label">
						Username
					</label>
					<input
						{...register('username')}
						type="text"
						name="username"
						id={`username__${uniqueId}`}
						className={twMerge(
							`min-h-[3.2rem] border-b-[2px] border-b-carousel-btn bg-transparent text-input focus-visible:border-b-navbar dark:focus-visible:border-b-carousel-dot`,
							errors?.username && errorClasses
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
					name="email"
					type="email"
					id={`email__${uniqueId}`}
					className={twMerge(
						`min-h-[3.2rem] border-b-[2px] border-b-carousel-btn bg-transparent text-input focus-visible:border-b-navbar dark:focus-visible:border-b-carousel-dot`,
						errors?.email && errorClasses
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
					name="password"
					type={isPasswordShow ? 'text' : 'password'}
					id={`password__${uniqueId}`}
					className={twMerge(
						'min-h-[3.2rem] border-b-[2px] border-b-carousel-btn bg-transparent text-input  focus-visible:border-b-navbar dark:focus-visible:border-b-carousel-dot',
						errors?.password && errorClasses
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
						name="confirmPassword"
						type={isConfirmPasswordShow ? 'text' : 'password'}
						id={`confirmPassword__${uniqueId}`}
						className={twMerge(
							'min-h-[3.2rem] border-b-[2px] border-b-carousel-btn bg-transparent text-input  focus-visible:border-b-navbar dark:focus-visible:border-b-carousel-dot',
							errors?.confirmPassword && errorClasses
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

			<InputGroup className={'flex flex-row gap-[1rem] text-[1.3rem] text-input'}>
				<input
					{...register(formType === 'Sign Up' ? 'acceptTerms' : 'rememberMe')}
					name={formType === 'Sign Up' ? 'acceptTerms' : 'rememberMe'}
					type="checkbox"
				/>

				{formType === 'Login' && <p>Remember me</p>}

				{formType === 'Sign Up' && (
					<>
						<p>
							I agree to all
							<Link
								to={' '}
								className="ml-[0.5rem] font-[500] underline hover:text-[hsl(214,89%,53%)]"
							>
								Terms & Conditions
							</Link>
						</p>
						{errors?.acceptTerms && <ErrorParagraph message={errors.acceptTerms.message} />}
					</>
				)}
			</InputGroup>

			<Button
				text={formType}
				type={'submit'}
				theme={'secondary'}
				disabled={isSubmitting}
				className={twMerge(
					'mt-[1.5rem] rounded-[1rem] text-[1.7rem] font-[600]',
					isSubmitting && 'cursor-not-allowed brightness-[0.5]'
				)}
			/>
		</form>
	);
}

export default FormArea;