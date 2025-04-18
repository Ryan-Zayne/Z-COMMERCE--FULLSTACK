import { isObject } from "@zayne-labs/toolkit-type-helpers";
import jwt from "jsonwebtoken";
import { Error as MongooseError } from "mongoose";
import { errorCodes } from "../../constants";
import { AppError } from "../../utils";

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

export const transformError = (error: AppError) => {
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
