/* eslint-disable consistent-return */

const asyncHandler = (controllerFn) => async (req, res, next) => {
	try {
		const result = await controllerFn(req, res, next);

		return result;
		// Forward error to error handler
	} catch (error) {
		next(error);
	}
};

// const wrapRouteWithAsyncHandler = (controllerFn) => (req, res, next) => {
// 	const errorResult = asyncHandler(controllerFn)(req, res, next);

// 	return errorResult;
// };

export { asyncHandler };
