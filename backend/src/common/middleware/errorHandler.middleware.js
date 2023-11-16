import { errorConstants, isDevMode } from '../utils/constants.js';

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
	const status = 'error';
	const statusCode = res.statusCode ?? 500;
	const message = err.message ?? 'Something went wrong';
	const stackTrace = isDevMode ? err.stack : 'Just dey play';

	// prettier-ignore
	const ERROR_LOOKUP = {
		[errorConstants.BAD_REQUEST]: () => res.status(400).json({ errorTitle: 'Bad Request', status, message, stackTrace }),

		[errorConstants.UNAUTHORIZED]: () => res.status(401).json({ errorTitle: 'Unauthorized', status, message, stackTrace }),

		[errorConstants.FORBIDDEN]: () => res.status(403).json({ errorTitle: 'Forbidden', status, message, stackTrace }),

		[errorConstants.NOT_FOUND]: () => res.status(404).json({ errorTitle: 'Not Found', status, message, stackTrace }),

		[errorConstants.VALIDATION_ERROR]: () => res.status(422).json({ errorTitle: 'Validation Failed', status, message, stackTrace }),

		[errorConstants.SERVER_ERROR]: () => res.status(500).json({	errorTitle: 'Internal Server Error', status, message, stackTrace }),

		default: () => res.status(500).json({  errorTitle: 'You don break something bah?', status, message, stackTrace }),
	};

	// eslint-disable-next-line security/detect-object-injection
	return Object.hasOwn(ERROR_LOOKUP, statusCode) ? ERROR_LOOKUP[statusCode]() : ERROR_LOOKUP.default();
};

export { errorHandler };
