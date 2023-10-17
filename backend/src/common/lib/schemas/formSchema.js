import { z } from 'zod';

export const SignUpSchema = z
	.object({
		username: z
			.string()
			.min(1, 'Username is required!')
			.min(3, 'Username must be at least 3 characters!')
			.regex(/^\w+$/, 'The username must contain only letters, numbers and underscore (_)'),

		email: z.string().email('Please enter a valid email!'),
		password: z.string().min(8, 'Password must be at least 8 characters!'),
		confirmPassword: z.string().min(1, 'Password confirmation is required!'),
		acceptTerms: z.boolean().refine((val) => val === true, 'Please check this box!'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Both passwords must match!',
		path: ['confirmPassword'],
	});

export const LoginSchema = z.object({
	email: z.string().email('Please enter a valid email!'),
	password: z.string().min(8, 'Password must be at least 8 characters!'),
	rememberMe: z.boolean().optional(),
});

export const validateDataWithZod = (Schema) => (req, res, next) => {
	const rawData = req.body;
	const result = Schema.safeParse(rawData);

	if (!result.success) {
		const zodErrors = { errors: result.error.flatten().fieldErrors };

		res.status(422).json(zodErrors);
		return;
	}

	req.validatedBody = result.data;
	next();
};
