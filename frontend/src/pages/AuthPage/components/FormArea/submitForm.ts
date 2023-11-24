import { fetchFormResponse } from '@/api/fetchFormResponse.ts';
import { noScrollOnOpen } from '@/lib/utils/no-scroll-on-open.ts';
import type { UseFormReset, UseFormSetError } from 'react-hook-form';
import type { NavigateFunction } from 'react-router-dom';
import type { FormAreaProps } from './FormArea';
import type { FormSchemaType } from './form.types';

type SubmitFormParams = {
	formType: FormAreaProps['formType'];
	setError: UseFormSetError<FormSchemaType>;
	reset: UseFormReset<FormSchemaType>;
	navigate: NavigateFunction;
};

const submitForm =
	({ formType, setError, reset, navigate }: SubmitFormParams) =>
	async (formData: FormSchemaType) => {
		try {
			noScrollOnOpen({ isOpen: true });

			const AUTH_URL = formType === 'Sign Up' ? `/sign-up` : `/login`;

			const responseData = await fetchFormResponse(AUTH_URL, { body: JSON.stringify(formData) });

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
				setError('root.serverCaughtError', {
					type: error.name,
					message: 'Something went wrong! Please try again later.',
				});

				console.error(error);
			}

			// Renable scrolling after submit or error
		} finally {
			noScrollOnOpen({ isOpen: false });
		}
	};

export { submitForm };
