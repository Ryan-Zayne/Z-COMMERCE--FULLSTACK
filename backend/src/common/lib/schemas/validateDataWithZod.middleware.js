import { asyncHandler } from '../../utils/asyncHandler.utils.js';
import { LoginSchema, SignUpSchema } from './formSchema.js';

const SCHEMA_LOOKUP = {
	'/sign-up': SignUpSchema,
	'/login': LoginSchema,

	default: () => {
		throw new Error('Schema not found!');
	},
};

const validateDataWithZod = asyncHandler((req, res, next) => {
	if (!(req.method === 'POST')) {
		next();
		return;
	}

	const rawData = req.body;
	const Schema = SCHEMA_LOOKUP[req.path] ?? SCHEMA_LOOKUP.default();

	const result = Schema.safeParse(rawData);

	if (!result.success) {
		const zodErrors = Object.entries(result.error.flatten().fieldErrors);

		res.status(422).json({ status: 'error', errors: zodErrors });
		return;
	}

	req.validatedBody = result.data;
	next();
});

export { validateDataWithZod };
