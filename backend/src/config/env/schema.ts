import { evaluateString } from "@/utils";
import { z } from "zod";

export const envSchema = z.object({
	ACCESS_JWT_EXPIRES_IN: z.string().transform((value) => evaluateString<number>(value)),
	ACCESS_SECRET: z.string(),
	COOKIE_SECRET: z.string(),
	EMAIL_APP_PASSWORD: z.string(),
	EMAIL_SECRET: z.string(),
	EMAIL_USER: z.string(),
	FRONTEND_URL: z.string(),
	MONGO_URI: z.string(),
	NODE_ENV: z.enum(["development", "production"]),
	PAYSTACK_HOST: z.string(),
	PAYSTACK_SECRET_KEY: z.string(),
	PORT: z.string(),
	REFRESH_JWT_EXPIRES_IN: z.string().transform((value) => evaluateString<number>(value)),
	REFRESH_SECRET: z.string(),
});
