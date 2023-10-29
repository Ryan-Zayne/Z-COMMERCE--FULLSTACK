import { z } from 'zod';

const LoginSchema = z.object({
	email: z.string().email('Please enter a valid email!'),
	password: z.string().min(8, 'Password must be at least 8 characters!'),
	rememberMe: z.boolean().optional(),
});

export { LoginSchema };
