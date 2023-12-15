import { fetchFormResponse } from '@/api/fetchFormResponse.ts';
import { noScrollOnOpen, } from '@/lib/utils/no-scroll-on-open.ts';
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
		const AUTH_URL = formType === 'Sign Up' ? `/sign-up` : `/login`;

		noScrollOnOpen({ isOpen: true });

		const { dataInfo, errorInfo } = await fetchFormResponse(AUTH_URL, {
			body: JSON.stringify(formData),
		});

		if (errorInfo?.response && 'errors' in errorInfo.response) {
			const { errors: zodErrors } = errorInfo.response;

			zodErrors.forEach(([field, errorMessage]) => {
				setError(field, {
					type: 'serverZodErrors',
					message: Array.isArray(errorMessage) ? errorMessage.join(', ') : errorMessage,
				});
			});

			return;
		}

		if (errorInfo?.response && 'errorTitle' in errorInfo.response) {
			const { errorTitle, message } = errorInfo.response;

			setError('root.serverError', {
				type: errorTitle,
				message,
			});

			return;
		}

		if (!dataInfo) {
			setError('root.serverCaughtError', {
				type: errorInfo.name,
				message: errorInfo.message,
			});

			return;
		}

		reset();
		navigate('/', { replace: true });
		noScrollOnOpen({ isOpen: false });
	};

export { submitForm };

