import { z } from "zod";

export type SessionData = {
	user: {
		email: string;
		id: string;
		isEmailVerified: boolean;
		isSuspended: boolean;
		role: string;
		username: string;
	};
};

export type FormErrorData = z.inferFlattenedErrors<z.ZodType<Record<string, unknown>>>["fieldErrors"];
