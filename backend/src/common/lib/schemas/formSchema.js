import { z } from 'zod';

export const SignUpSchema = z
	.object({
		username: z
			.string({ required_error: 'Username is required!' })
			.min(3, 'Username must be at least 3 characters!')
			.regex(/^\w+$/, 'The username must contain only letters, numbers and underscore (_)'),

		email: z.string().email('Please enter a valid email!'),
		password: z.string().min(8, 'Password must be at least 8 characters!'),
		confirmPassword: z.string({ required_error: 'Password confirmation is required!' }),
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
