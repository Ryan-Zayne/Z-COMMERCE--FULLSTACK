import { z } from "zod";

export const SignUpSchema = z
	.object({
		username: z
			.string()
			.min(3, "Username must be at least 3 characters!")
			.max(30, "Username must not be more than 30 characters long")
			.regex(
				/^(?!.*-[a-z])[A-Z]['a-z-]*(?:-[A-Z]['a-z-]*)*(?:'[A-Z]['a-z-]*)*$/,
				`Username must be in sentence case, and can include hyphens and apostrophes, A hyphen MUST be followed by an uppercase letter, Examples include: "Ali", "Ade-Bright" or "Smith's"`
			),

		email: z.string().email("Please enter a valid email!"),
		password: z.string().min(8, "Password must be at least 8 characters!"),
		confirmPassword: z.string().min(1, "Password confirmation is required!"),
		acceptTerms: z.boolean().refine((val) => val, "Please check this box!"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match!",
		path: ["confirmPassword"],
	});

export const LoginSchema = z.object({
	email: z.string().email("Please enter a valid email!"),
	password: z.string(),
	rememberMe: z.boolean().optional(),
});
