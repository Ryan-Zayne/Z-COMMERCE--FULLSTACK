export const PORT = process.env.PORT ?? 8001;

export const environment = process.env.NODE_ENV;

export const errorConstants = /** @type {const} */ ({
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	VALIDATION_ERROR: 422,
	SERVER_ERROR: 500,
});
