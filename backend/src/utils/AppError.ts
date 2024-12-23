import type { ErrorCodesUnion } from "../constants";

class AppError extends Error {
	errors?: unknown;
	isOperational: boolean;
	status: string;
	statusCode: ErrorCodesUnion;

	constructor(
		statusCode: ErrorCodesUnion,
		message: string,
		options: ErrorOptions & { errors?: unknown } = {}
	) {
		super(message, options);

		this.statusCode = statusCode;
		this.status = String(statusCode).startsWith("5") ? "Failed" : "Error";
		this.isOperational = true;
		this.errors = options.errors;

		Error.captureStackTrace(this, this.constructor);
	}
}

export { AppError };
