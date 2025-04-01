import { z } from "zod";

export const SignUpSchema = z
	.object({
		acceptTerms: z.boolean().refine((val) => val, "Please accept the terms and conditions"),
		confirmPassword: z.string().min(1, "Password confirmation is required!"),
		email: z.string().email("Please enter a valid email!"),
		password: z.string().min(8, "Password must be at least 8 characters!"),
		username: z
			.string()
			.min(3, "Username must be at least 3 characters!")
			.max(30, "Username must not be more than 30 characters long")

			.regex(
				/^(?!.*-[a-z])[A-Z]['a-z-]*(?:-[A-Z]['a-z-]*)*(?:'[A-Z]['a-z-]*)*$/,
				`
				Username must be in sentence case, and can include hyphen, and apostrophes.
				A hyphen MUST be followed by an uppercase letter.
				Examples include: "Ali", "Ade-Bright" or "Smith's".
				`
			),
	})
	.strict()
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match!",
		path: ["confirmPassword"],
	});

export const LoginSchema = z
	.object({
		email: z.string().min(1, "Email is a required field"),
		password: z.string().min(1, "Password is a required field"),
		rememberMe: z.boolean().optional(),
	})
	.strict();

export type FormSchemaType = z.infer<typeof LoginSchema> & z.infer<typeof SignUpSchema>;
