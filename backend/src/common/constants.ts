import { ENVIRONMENT } from "@/common/env";
import { defineEnum } from "@zayne-labs/toolkit/type-helpers";

export const PORT = ENVIRONMENT.PORT;

export const isDevMode = ENVIRONMENT.NODE_ENV === "development";
export const isProduction = ENVIRONMENT.NODE_ENV === "production";

export const errorCodes = defineEnum({
	BAD_REQUEST: 400,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	SERVER_ERROR: 500,
	UNAUTHORIZED: 401,
	VALIDATION_ERROR: 422,
});

export type ErrorCodesUnion = (typeof errorCodes)[keyof typeof errorCodes];
