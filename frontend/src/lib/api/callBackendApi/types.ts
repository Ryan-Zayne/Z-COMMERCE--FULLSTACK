import type { FormBodySchemaType } from "@/lib/schemas/formSchema";

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

export type FormErrorResponseType = {
	fieldErrors: Record<keyof FormBodySchemaType, string[]>;
	formErrors: string[];
};
