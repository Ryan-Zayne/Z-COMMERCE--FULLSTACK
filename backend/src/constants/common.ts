import { ENVIRONMENT } from "@/config/env";
import { defineEnum } from "@zayne-labs/toolkit/type-helpers";

export const PORT = ENVIRONMENT.PORT;

export const isDevMode = ENVIRONMENT.NODE_ENV === "development";

export const isProduction = ENVIRONMENT.NODE_ENV === "production";

export const errorCodes = defineEnum({
	BAD_REQUEST: 400,
	CONFLICT: 409,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	REQUEST_TIMEOUT: 408,
	SERVER_ERROR: 500,
	UNAUTHORIZED: 401,
	VALIDATION_ERROR: 422,
});

export type ErrorCodesUnion = (typeof errorCodes)[keyof typeof errorCodes];

const evaluateString = (value: string) => globalThis.eval(`"use strict";(${value})`) as number;

export const ACCESS_JWT_EXPIRES_IN = evaluateString(ENVIRONMENT.ACCESS_JWT_EXPIRES_IN);

export const REFRESH_JWT_EXPIRES_IN = evaluateString(ENVIRONMENT.REFRESH_JWT_EXPIRES_IN);
