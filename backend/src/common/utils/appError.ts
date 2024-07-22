import type { errorCodes } from "../constants";

class AppError extends Error {
	statusCode: (typeof errorCodes)[keyof typeof errorCodes];
	status: string;
	isOperational: boolean;
	data?: unknown;

	constructor(statusCode: (typeof errorCodes)[keyof typeof errorCodes], message: string, data?: unknown) {
		super(message);

		this.statusCode = statusCode;
		this.status = `${statusCode}`.startsWith("5") ? "Failed" : "Error";
		this.isOperational = true;
		this.data = data;

		Error.captureStackTrace(this, this.constructor);
	}
}

export { AppError };
