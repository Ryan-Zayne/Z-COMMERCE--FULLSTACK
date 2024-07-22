import { z } from "zod";

// == Disabling process.env globally via TS
declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace NodeJS {
		/* eslint-disable @typescript-eslint/consistent-type-definitions */
		// @ts-expect-error - Ignoring ts assignability issues with Record<string, undefined>, because it's there to disable access to process.env not included in the zod schema
		interface ProcessEnv extends z.infer<typeof envSchema>, Record<string, undefined> {}
	}
}

const envSchema = z.object({
	PORT: z.string(),
	NODE_ENV: z.string(),
	MONGO_URI: z.string(),
	COOKIE_SECRET: z.string(),
	ACCESS_SECRET: z.string(),
	REFRESH_SECRET: z.string(),
});

// Will crash server if an env variable is missing not found
export const ENVIRONMENT = envSchema.parse(process.env);
