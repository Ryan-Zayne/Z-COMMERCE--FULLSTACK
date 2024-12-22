import type { ErrorRequestHandler } from "express";
import { errorCodes, isDevMode } from "../constants";
import type { AppError } from "../utils";

const errorHandler: ErrorRequestHandler = (error: AppError & { kind: string }, _req, res, _next) => {
	/* eslint-disable ts-eslint/no-unnecessary-condition */
	/* eslint-disable perfectionist/sort-objects */
	const errorInfo = {
		status: "error",
		message: error.message ?? "Something went wrong",
		statusCode: error.statusCode ?? 500,
		...(Boolean(error.errors) && {
			errors: error.errors,
		}),
		stackTrace: isDevMode ? error.stack : "Just dey play",
	};

	if (error.name === "CastError" && error.kind === "ObjectId") {
		const { stackTrace, status } = errorInfo;

		res.status(404).json({
			message: "Resource not found",
			stackTrace,
			status,
			statusCode: 404,
		});

		return;
	}

	// prettier-ignore
	const ERROR_LOOKUP = new Map([
		[String(errorCodes.BAD_REQUEST), () => res.status(400).json(errorInfo)],

		[String(errorCodes.FORBIDDEN), () => res.status(403).json(errorInfo)],

		[String(errorCodes.NOT_FOUND), () => res.status(404).json(errorInfo)],

		[String(errorCodes.SERVER_ERROR), () => res.status(500).json(errorInfo)],

		[String(errorCodes.UNAUTHORIZED), () => res.status(401).json(errorInfo)],

		[String(errorCodes.VALIDATION_ERROR), () => res.status(422).json(errorInfo)],

		/* eslint-disable perfectionist/sort-maps */
		["default", () => res.status(500).json(errorInfo)],
	]);

	(ERROR_LOOKUP.get(String(errorInfo.statusCode)) ?? ERROR_LOOKUP.get("default"))?.();
};

export { errorHandler };
