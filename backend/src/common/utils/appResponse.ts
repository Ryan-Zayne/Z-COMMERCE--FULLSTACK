import type { Response } from "express";

function AppResponse(res: Response, statusCode: number, message?: string, data?: unknown) {
	/* eslint-disable perfectionist/sort-objects  */
	res.status(statusCode).json({
		status: "success",
		message: message ?? "Success",
		...(Boolean(data) && { data }),
	});
}

export { AppResponse };
