import type { FormSchemaType } from "@/lib/schemas/formSchema";

export type UserSessionData = {
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
	fieldErrors: Record<keyof FormSchemaType, string[]>;
	formErrors: string[];
};
