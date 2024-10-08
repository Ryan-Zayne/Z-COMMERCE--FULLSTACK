import type { Response } from "express";

function AppResponse(res: Response, statusCode: number, message?: string, data?: unknown) {
	res.status(statusCode).json({
		data: data ?? null,
		message: message ?? "Success",
		status: "success",
	});
}

export { AppResponse };
