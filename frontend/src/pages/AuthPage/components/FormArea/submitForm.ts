import { BASE_AUTH_URL } from '@/utils/constants.ts';
import { noScrollOnOpen } from '@/utils/no-scroll-on-open.ts';
import type { UseFormReset, UseFormSetError } from 'react-hook-form';
import type { NavigateFunction } from 'react-router-dom';
import type { FormSchemaType } from '../form.types';
import type { FormAreaProps } from './FormArea';

type FormResponseDataType =
	| { status: 'success'; accessToken: string; userName: string; email: string }
	| { status: 'error'; errors: Array<[keyof FormSchemaType, string | string[]]> }
	| { status: 'error'; errorTitle: string; message: string; stackTrace: string };

type SubmitFormParams = {
	formType: FormAreaProps['formType'];
	setError: UseFormSetError<FormSchemaType>;
	reset: UseFormReset<FormSchemaType>;
	navigate: NavigateFunction;
};

const fetchFormResponse = async (AUTH_URL: string, data: FormSchemaType) => {
	const response = await fetch(AUTH_URL, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'same-origin',
	});

	if (!response.ok) {
		throw new Error('Failed to submit form');
	}

	return response.json() as Promise<FormResponseDataType>;
};

const submitForm =
	({ formType, setError, reset, navigate }: SubmitFormParams) =>
	async (data: FormSchemaType) => {
		try {
			noScrollOnOpen({ isOpen: true });

			const AUTH_URL = formType === 'Sign Up' ? `${BASE_AUTH_URL}/sign-up` : `${BASE_AUTH_URL}/login`;

			const responseData = await fetchFormResponse(AUTH_URL, data);

			if (responseData.status === 'error' && 'errors' in responseData) {
				const zodErrors = responseData.errors;

				zodErrors.forEach(([field, errorMessage]) => {
					setError(field, {
						type: 'serverZodErrors',
						message: Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage,
					});
				});

				return;
			}

			if (responseData.status === 'error' && 'message' in responseData) {
				setError('root.serverError', {
					type: responseData.errorTitle,
					message: responseData.message,
				});

				return;
			}

			reset();
			navigate('/', { replace: true });

			// Handle caught server errors
		} catch (error) {
			/* eslint-disable no-console */
			if (error instanceof Error) {
				setError('root.serverCatch', {
					type: error.name,
					message: 'Something went wrong',
				});

				console.error(error);
			}

			// Renable scrolling after submit or error
		} finally {
			noScrollOnOpen({ isOpen: false });
		}
	};

export { submitForm };
