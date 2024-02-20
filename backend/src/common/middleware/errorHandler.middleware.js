import { errorConstants, isDevMode } from "../lib/utils/constants.js";

/* eslint-disable consistent-return */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
	const errorInfo = {
		status: "error",
		statusCode: res.statusCode ?? 500,
		message: err.message ?? "Something went wrong",
		stackTrace: isDevMode ? err.stack : "Just dey play",
	};

	if (err.name === "CastError" && err.kind === "ObjectId") {
		const { status, stackTrace } = errorInfo;

		// prettier-ignore
		res.status(404).json({ errorTitle: 'Not Found', status, statusCode: 404, message: 'Resource not found', stackTrace });

		return;
	}

	// prettier-ignore
	const ERROR_LOOKUP = new Map([
		[errorConstants.BAD_REQUEST, () => res.status(400).json({ errorTitle: 'Bad Request', ...errorInfo })],

		[errorConstants.UNAUTHORIZED, () => res.status(401).json({ errorTitle: 'Unauthorized', ...errorInfo })],

		[errorConstants.FORBIDDEN, () => res.status(403).json({ errorTitle: 'Forbidden', ...errorInfo })],

		[errorConstants.NOT_FOUND, () => res.status(404).json({ errorTitle: 'Not Found', ...errorInfo })],

		[errorConstants.VALIDATION_ERROR, () => res.status(422).json({ errorTitle: 'Validation Failed', ...errorInfo })],

		[errorConstants.SERVER_ERROR, () => res.status(500).json({ errorTitle: 'Internal Server Error', ...errorInfo })],

		['default', () => res.status(500).json({ errorTitle: 'You don break something bah?', ...errorInfo })],
	]);

	return (ERROR_LOOKUP.get(errorInfo.statusCode) ?? ERROR_LOOKUP.get("default"))();
};

export { errorHandler };
