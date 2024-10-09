import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils";

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
	const error = new AppError(
		404,
		`No '${req.method.toUpperCase()}' request handler defined for '${
			req.originalUrl
		}'. Check the API documentation for more details.`
	);

	next(error);
};

export { notFoundHandler };
