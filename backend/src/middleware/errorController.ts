import { isObject } from "@zayne-labs/toolkit/type-helpers";
import type { ErrorRequestHandler } from "express";
import jwt from "jsonwebtoken";
import { Error as MongooseError } from "mongoose";
import { type ErrorCodesUnion, errorCodes, isDevMode } from "../constants";
import { AppError, AppResponse } from "../utils";

const handleMongooseCastError = (error: MongooseError.CastError) => {
	const message = `Invalid ${error.path} value "${error.value}".`;

	return new AppError(400, message);
};

const handleMongooseValidationError = (error: MongooseError.ValidationError) => {
	const errors = Object.values(error.errors).map((e) => e.message);

	const message = `Invalid input data. ${errors.join(". ")}`;
	return new AppError(400, message);
};

const handleMongooseDuplicateFieldsError = (error: MongooseError) => {
	const isDuplicateFieldError =
		"code" in error && error.code === 11000 && "keyValue" in error && error.keyValue;

	if (!isDuplicateFieldError) {
		return new AppError(errorCodes.SERVER_ERROR, error.message, { cause: error });
	}

	if (!isObject(error.keyValue)) {
		return new AppError(errorCodes.SERVER_ERROR, error.message, { cause: error });
	}

	const firstKeyValueEntry = Object.entries(error.keyValue)[0];

	if (!firstKeyValueEntry) {
		return new AppError(errorCodes.SERVER_ERROR, error.message, { cause: error });
	}

	// == Extract value from the error message if it matches a pattern
	// eslint-disable-next-line ts-eslint/no-unsafe-assignment
	const [field, value] = firstKeyValueEntry;

	const formattedField = field
		.replaceAll(/([a-z])([A-Z])/g, "$1 $2") // Handle camelCase
		.replaceAll(/^([A-Z])/g, (match) => match.toLowerCase()) // Handle PascalCase start
		.toLowerCase()
		.trim();

	const capitalizedField = formattedField.charAt(0).toUpperCase() + formattedField.slice(1);

	return new AppError(409, `${capitalizedField} "${value}" has already been used!`, { cause: error });
};

const handleTimeoutError = (error: Error) => new AppError(408, "Request timeout", { cause: error });

// prettier-ignore
const handleJWTError = (error: jwt.JsonWebTokenError) => new AppError(401, "Invalid token. Please log in again!", { cause: error });

// prettier-ignore
const handleJWTExpiredError = (error: jwt.TokenExpiredError) => new AppError(401, "Your token has expired!", { cause: error });

const errorModifier = (error: AppError) => {
	let modifiedError = error;

	switch (true) {
		case error instanceof MongooseError.CastError: {
			modifiedError = handleMongooseCastError(error);
			break;
		}

		case error instanceof MongooseError.ValidationError: {
			modifiedError = handleMongooseValidationError(error);
			break;
		}

		case "timeout" in error && error.timeout: {
			modifiedError = handleTimeoutError(error);
			break;
		}

		case error instanceof jwt.JsonWebTokenError: {
			modifiedError = handleJWTError(error);
			break;
		}

		case error instanceof jwt.TokenExpiredError: {
			modifiedError = handleJWTExpiredError(error);
			break;
		}

		case error instanceof MongooseError: {
			modifiedError = handleMongooseDuplicateFieldsError(error);
			break;
		}

		default: {
			// Do nothing
			break;
		}
	}

	return modifiedError;
};

const errorController: ErrorRequestHandler = (error: AppError, _req, res, _next) => {
	const modifiedError = errorModifier(error);

	/* eslint-disable ts-eslint/no-unnecessary-condition */
	/* eslint-disable perfectionist/sort-objects */
	const errorInfo = {
		status: "error",
		message: modifiedError.message ?? "Something went very wrong!",
		statusCode: modifiedError.statusCode ?? 500,
		...(Boolean(modifiedError.errors) && { errors: modifiedError.errors }),
		stackTrace: isDevMode ? modifiedError.stack : "Just dey play",
	};
	/* eslint-enable perfectionist/sort-objects */

	const ERROR_LOOKUP = new Map([
		[errorCodes.BAD_REQUEST, () => AppResponse(res, 400, errorInfo)],

		[errorCodes.CONFLICT, () => AppResponse(res, 409, errorInfo)],

		[errorCodes.FORBIDDEN, () => AppResponse(res, 403, errorInfo)],

		[errorCodes.NOT_FOUND, () => AppResponse(res, 404, errorInfo)],

		[errorCodes.REQUEST_TIMEOUT, () => AppResponse(res, 408, errorInfo)],

		[errorCodes.SERVER_ERROR, () => AppResponse(res, 500, errorInfo)],

		[errorCodes.UNAUTHORIZED, () => AppResponse(res, 401, errorInfo)],

		[errorCodes.VALIDATION_ERROR, () => AppResponse(res, 422, errorInfo)],
	]) satisfies Map<ErrorCodesUnion, () => void>;

	const statusCodeHandler = ERROR_LOOKUP.get(errorInfo.statusCode);

	if (!statusCodeHandler) {
		return AppResponse(res, 500, errorInfo);
	}

	return statusCodeHandler();
};

export { errorController };
