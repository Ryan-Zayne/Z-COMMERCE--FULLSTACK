import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils";

const notFoundHandler = (req: Request, _res: Response, next: NextFunction) => {
	const message = `No '${req.method.toUpperCase()}' request handler defined for '${req.originalUrl}'. Check the API documentation for more details.`;

	const error = new AppError(404, message);

	next(error);
};

export { notFoundHandler };
