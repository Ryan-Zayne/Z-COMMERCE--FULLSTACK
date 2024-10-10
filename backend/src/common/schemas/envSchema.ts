import { z } from "zod";

const envSchema = z.object({
	ACCESS_JWT_EXPIRES_IN: z.string(),
	ACCESS_SECRET: z.string(),
	COOKIE_SECRET: z.string(),
	MONGO_URI: z.string(),
	NODE_ENV: z.string(),
	PORT: z.string(),
	REFRESH_JWT_EXPIRES_IN: z.string(),
	REFRESH_SECRET: z.string(),
});

export { envSchema };
