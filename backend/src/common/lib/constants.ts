export const PORT = process.env.PORT ?? 8001;

export const isDevMode = process.env.NODE_ENV === "development";
export const isProduction = process.env.NODE_ENV === "production";

export const errorCodes = {
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	VALIDATION_ERROR: 422,
	SERVER_ERROR: 500,
} as const;
