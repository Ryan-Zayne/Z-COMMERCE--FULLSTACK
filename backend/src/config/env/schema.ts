import { z } from "zod";

export const envSchema = z.object({
	ACCESS_JWT_EXPIRES_IN: z.string(),
	ACCESS_SECRET: z.string(),
	COOKIE_SECRET: z.string(),
	EMAIL_APP_PASSWORD: z.string(),
	EMAIL_SECRET: z.string(),
	EMAIL_USER: z.string(),
	FRONTEND_URL: z.string(),
	MONGO_URI: z.string(),
	NODE_ENV: z.enum(["development", "production"]),
	PORT: z.string(),
	REFRESH_JWT_EXPIRES_IN: z.string(),
	REFRESH_SECRET: z.string(),
});
