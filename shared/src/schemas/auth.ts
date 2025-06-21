import { z } from "../zod";

export const SignupBodySchema = z
	.object({
		acceptTerms: z.boolean().refine((val) => val, { error: "Please accept the terms and conditions" }),
		confirmPassword: z.string().min(1, { error: "Password confirmation is required!" }),
		email: z.email({ error: "Please enter a valid email!" }),
		password: z.string().min(8, { error: "Password must be at least 8 characters!" }),
		username: z
			.string()
			.min(3, { error: "Username must be at least 3 characters!" })
			.max(30, { error: "Username must not be more than 30 characters long" })
			.regex(/^(?!.*-[a-z])[A-Z]['a-z-]*(?:-[A-Z]['a-z-]*)*(?:'[A-Z]['a-z-]*)*$/, {
				error: `Username must be in sentence case, and can include hyphen, and apostrophes.
				A hyphen MUST be followed by an uppercase letter.
				Examples include: "Ali", "Ade-Bright" or "Smith's".`,
			}),
	})
	.strict()
	.refine((data) => data.password === data.confirmPassword, {
		error: "Passwords do not match!",
		path: ["confirmPassword"],
	});

export const SigninBodySchema = z
	.object({
		email: z.string().min(1, { error: "Email is a required field" }),
		password: z.string().min(1, { error: "Password is a required field" }),
		rememberMe: z.boolean().optional(),
	})
	.strict();

export type SigninBodySchemaType = z.infer<typeof SigninBodySchema>;

export type SignupBodySchemaType = z.infer<typeof SignupBodySchema>;

export type FormBodySchemaType = SigninBodySchemaType & SignupBodySchemaType;
