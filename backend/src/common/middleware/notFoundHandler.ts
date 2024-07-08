import type { NextFunction, Request, Response } from "express";

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
	const error = new Error(
		`Cannot find ${req.method.toUpperCase()} request handler for "${req.originalUrl}"`
	);

	res.status(404);
	next(error);
};

export { notFoundHandler };
