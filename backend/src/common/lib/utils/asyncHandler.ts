const asyncHandler = (controllerFn) => async (req, res, next) => {
	try {
		const result = await controllerFn(req, res, next);

		return result;
		// Forward error to error handler
	} catch (error) {
		next(error);
	}
};

export { asyncHandler };
