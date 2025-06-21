import { consola } from "consola";
import type { Request, Response } from "express";
import { AppError, AppResponse } from "../utils";
import { catchAsync } from "./catchAsyncErrors";

const notFoundHandler = catchAsync((req: Request, res: Response) => {
	if (req.originalUrl === "/") {
		consola.info("Ping by Render!");
		return AppResponse(res, 200, "Ping by Render!");
	}

	const message = `No '${req.method.toUpperCase()}' request handler defined for '${req.originalUrl}'. Check the API documentation for more details.`;

	throw new AppError(404, message);
});

export { notFoundHandler };
