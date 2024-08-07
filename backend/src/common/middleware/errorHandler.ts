import type { ErrorRequestHandler } from "express";
import { errorCodes, isDevMode } from "../constants";
import type { AppError } from "../utils";

const errorHandler: ErrorRequestHandler = (error: AppError & { kind: string }, req, res, next) => {
	/* eslint-disable @typescript-eslint/no-unnecessary-condition */
	const errorInfo = {
		status: "error",
		statusCode: error.statusCode ?? 500,
		message: error.message ?? "Something went wrong",
		stackTrace: isDevMode ? error.stack : "Just dey play",
	};

	if (error.name === "CastError" && error.kind === "ObjectId") {
		const { status, stackTrace } = errorInfo;

		res.status(404).json({
			errorTitle: "Not Found",
			status,
			statusCode: 404,
			message: "Resource not found",
			stackTrace,
		});

		return;
	}

	// prettier-ignore
	const ERROR_LOOKUP = {
		[errorCodes.BAD_REQUEST]: () => res.status(400).json({ errorTitle: "Bad Request", ...errorInfo }),

		[errorCodes.UNAUTHORIZED]: () => res.status(401).json({ errorTitle: "Unauthorized", ...errorInfo }),

		[errorCodes.FORBIDDEN]: () => res.status(403).json({ errorTitle: "Forbidden", ...errorInfo }),

		[errorCodes.NOT_FOUND]: () => res.status(404).json({ errorTitle: "Not Found", ...errorInfo }),

		[errorCodes.VALIDATION_ERROR]: () => res.status(422).json({ errorTitle: "Validation Failed", ...errorInfo }),

		[errorCodes.SERVER_ERROR]: () => res.status(500).json({ errorTitle: "Internal Server Error", ...errorInfo }),

		default: () => res.status(500).json({ errorTitle: "You don break something bah?", ...errorInfo }),
	};

	return (ERROR_LOOKUP[errorInfo.statusCode] ?? ERROR_LOOKUP.default)();
};

export { errorHandler };
