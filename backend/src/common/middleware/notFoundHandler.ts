import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils";

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
	const error = new AppError(
		404,
		`Cannot find ${req.method.toUpperCase()} request handler for "${req.originalUrl}"`
	);

	next(error);
};

export { notFoundHandler };
