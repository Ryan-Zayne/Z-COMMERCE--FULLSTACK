/* eslint-disable consistent-return */

const asyncHandler = (asyncCallbackFn) => async (req, res, next) => {
	try {
		const result = await asyncCallbackFn(req, res, next);

		return result;
		// Forward error to error handler
	} catch (error) {
		next(error);
	}
};

export { asyncHandler };
