import type { z } from "zod";
import { envSchema } from "./zod-schemas/envSchema";

// == Disabling process.env globally via TS
declare global {
	// eslint-disable-next-line ts-eslint/no-namespace
	namespace NodeJS {
		/* eslint-disable ts-eslint/consistent-type-definitions */

		interface ProcessEnv extends z.infer<typeof envSchema>, Record<string, undefined> {}
	}
}

// Will crash server if an env variable is missing not found
const result = envSchema.safeParse(process.env);

if (!result.success) {
	throw new Error("Missing environment variable(s)", { cause: result.error.flatten().fieldErrors });
}

export const ENVIRONMENT = result.data;
