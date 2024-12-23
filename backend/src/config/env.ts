import { z } from "zod";

const envSchema = z.object({
	ACCESS_JWT_EXPIRES_IN: z.string(),
	ACCESS_SECRET: z.string(),
	COOKIE_SECRET: z.string(),
	EMAIL_APP_PASSWORD: z.string(),
	EMAIL_SECRET: z.string(),
	EMAIL_USER: z.string(),
	FRONTEND_URL: z.string(),
	MONGO_URI: z.string(),
	NODE_ENV: z.string(),
	PORT: z.string(),
	REFRESH_JWT_EXPIRES_IN: z.string(),
	REFRESH_SECRET: z.string(),
});

// == Disabling process.env globally via TS
declare global {
	// eslint-disable-next-line ts-eslint/no-namespace
	namespace NodeJS {
		/* eslint-disable ts-eslint/consistent-type-definitions */

		interface ProcessEnv extends z.infer<typeof envSchema>, Record<string, undefined> {}
	}
}

// == This will crash server if an env variable is missing or not found
const result = envSchema.safeParse(process.env);

if (!result.success) {
	throw new Error("Missing environment variable(s)", { cause: result.error.flatten().fieldErrors });
}

export const ENVIRONMENT = result.data;
