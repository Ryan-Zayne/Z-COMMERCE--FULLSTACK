/* eslint-disable security/detect-object-injection */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { errorConstants, isDevMode } from '../lib/utils/constants.js';

const errorHandler = (err, req, res, next) => {
	const statusCode = res.statusCode ?? 500;
	const message = err.message ?? 'Something went wrong';
	const stackTrace = isDevMode ? err.stack : 'Just dey play';

	// prettier-ignore
	const ERROR_LOOKUP = {
		[errorConstants.BAD_REQUEST]: () => res.status(400).json({ title: 'Bad Request', message, stackTrace }),

		[errorConstants.UNAUTHORIZED]: () => res.status(401).json({ title: 'Unauthorized', message, stackTrace }),

		[errorConstants.FORBIDDEN]: () => res.status(403).json({ title: 'Forbidden', message, stackTrace }),

		[errorConstants.NOT_FOUND]: () => res.status(404).json({ title: 'Not Found', message, stackTrace }),

		[errorConstants.VALIDATION_ERROR]: () => res.status(422).json({ title: 'Validation Failed', message, stackTrace }),

		[errorConstants.SERVER_ERROR]: () => res.status(500).json({ title: 'Internal Server Error', message, stackTrace }),

		default: () => res.status(500).json({ title: 'You don break something bah?', message, stackTrace }),
	};

	return Object.hasOwn(ERROR_LOOKUP, statusCode) ? ERROR_LOOKUP[statusCode]() : ERROR_LOOKUP.default();
};

export { errorHandler };
