import { isObject } from "@zayne-labs/toolkit/type-helpers";
import { consola } from "consola";
import type { ErrorRequestHandler } from "express";
import jwt from "jsonwebtoken";
import { Error as MongooseError } from "mongoose";
import { type ErrorCodesUnion, errorCodes, isDevMode } from "../constants";
import { AppError } from "../utils";

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
		.replaceAll(/([a-z])([A-Z])/g, "$1 $2")
		.split(/(?=[A-Z])/)
		.map((word, index) =>
			index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word.toLowerCase()
		)
		.join("");

	return new AppError(409, `${formattedField} "${value}" has already been used!`, { cause: error });
};

const handleTimeoutError = (error: Error) => new AppError(408, "Request timeout", { cause: error });

// prettier-ignore
const handleJWTError = (error: jwt.JsonWebTokenError) => new AppError(401, "Invalid token!", { cause: error });

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

	consola.error(`${error.name}:`, {
		status: errorInfo.status,
		message: errorInfo.message,
		statusCode: errorInfo.statusCode,
		...(Boolean(errorInfo.errors) && { errors: errorInfo.errors }),
	});

	/* eslint-enable perfectionist/sort-objects */
	const ERROR_LOOKUP = new Map([
		[errorCodes.BAD_REQUEST, () => res.status(400).json(errorInfo)],

		[errorCodes.CONFLICT, () => res.status(409).json(errorInfo)],

		[errorCodes.FORBIDDEN, () => res.status(403).json(errorInfo)],

		[errorCodes.NOT_FOUND, () => res.status(404).json(errorInfo)],

		[errorCodes.REQUEST_TIMEOUT, () => res.status(408).json(errorInfo)],

		[errorCodes.SERVER_ERROR, () => res.status(500).json(errorInfo)],

		[errorCodes.UNAUTHORIZED, () => res.status(401).json(errorInfo)],

		[errorCodes.VALIDATION_ERROR, () => res.status(422).json(errorInfo)],
	]) satisfies Map<ErrorCodesUnion, () => void>;

	// prettier-ignore
	const statusCodeHandler = ERROR_LOOKUP.get(errorInfo.statusCode) ?? (() => res.status(500).json(errorInfo));

	statusCodeHandler();
};

export { errorController };
