import { ENVIRONMENT } from "@/env";
import type { Writeable } from "./type-helpers/global";

export const PORT = ENVIRONMENT.PORT;

export const isDevMode = ENVIRONMENT.NODE_ENV === "development";
export const isProduction = ENVIRONMENT.NODE_ENV === "production";

const $errorCodes = {
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	VALIDATION_ERROR: 422,
	SERVER_ERROR: 500,
} as const;

export const errorCodes = $errorCodes as Writeable<typeof $errorCodes>;
