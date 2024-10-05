import type { ErrorRequestHandler } from "express";
import { errorCodes, isDevMode } from "../constants";
import type { AppError } from "../utils";

const errorHandler: ErrorRequestHandler = (error: AppError & { kind: string }, _req, res, _next) => {
	/* eslint-disable ts-eslint/no-unnecessary-condition */
	const errorInfo = {
		message: error.message ?? "Something went wrong",
		status: "error",
		statusCode: error.statusCode ?? 500,
		...(Boolean(error.errors) && { errors: error.errors }),
		stackTrace: isDevMode ? error.stack : "Just dey play",
	};

	if (error.name === "CastError" && error.kind === "ObjectId") {
		const { stackTrace, status } = errorInfo;

		res.status(404).json({
			errorTitle: "Not Found",
			message: "Resource not found",
			stackTrace,
			status,
			statusCode: 404,
		});

		return;
	}

	// prettier-ignore
	const ERROR_LOOKUP = {
		default: () => res.status(500).json({ errorTitle: "You don break something bah?", ...errorInfo }),

		[errorCodes.BAD_REQUEST]: () => res.status(400).json({ errorTitle: "Bad Request", ...errorInfo }),

		[errorCodes.FORBIDDEN]: () => res.status(403).json({ errorTitle: "Forbidden", ...errorInfo }),

		[errorCodes.NOT_FOUND]: () => res.status(404).json({ errorTitle: "Not Found", ...errorInfo }),

		[errorCodes.SERVER_ERROR]: () => res.status(500).json({ errorTitle: "Internal Server Error", ...errorInfo }),

		[errorCodes.UNAUTHORIZED]: () => res.status(401).json({ errorTitle: "Unauthorized", ...errorInfo }),

		[errorCodes.VALIDATION_ERROR]: () => res.status(422).json({ errorTitle: "Validation Failed", ...errorInfo }),
	};

	return (ERROR_LOOKUP[errorInfo.statusCode] ?? ERROR_LOOKUP.default)();
};

export { errorHandler };
