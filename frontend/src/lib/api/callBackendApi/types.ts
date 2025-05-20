import type { $ZodErrorTree } from "zod/v4/core";

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

export type FormErrorResponseType = $ZodErrorTree<Record<string, unknown>>;
