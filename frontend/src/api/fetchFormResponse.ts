import { BASE_AUTH_URL } from '@/lib/utils/constants.ts';
import { createFetcherInstance } from '@/lib/utils/create-fetcher-instance/create-fetcher-instance.ts';
import type { FormSchemaType } from '@/pages/AuthPage/components/FormArea/form.types.ts';

type FormResponseDataType =
	| { status: 'success'; accessToken: string; user: { name: string; email: string } }
	| { status: 'error'; errors: Array<[keyof FormSchemaType, string | string[]]> }
	| { status: 'error'; errorTitle: string; message: string; stackTrace: string };

const fetchFormResponse = createFetcherInstance<FormResponseDataType>({
	baseURL: BASE_AUTH_URL,

	defaultErrorMessage: 'Failed to submit form',

	method: 'POST',

	headers: {
		'Content-Type': 'application/json',
	},

	credentials: 'same-origin',
});

export { fetchFormResponse };
