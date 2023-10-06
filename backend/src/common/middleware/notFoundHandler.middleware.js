/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const notFoundHandler = (req, res, next) => {
	const error = new Error(`Cannot ${req.method.toUpperCase()} - ${req.originalUrl}`);

	res.status(404);
	next(error);
};

export { notFoundHandler };
