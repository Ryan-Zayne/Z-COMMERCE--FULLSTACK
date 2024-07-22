import type { Response } from "express";

function AppResponse(res: Response, statusCode: number, message?: string, data?: unknown) {
	res.status(statusCode).json({
		status: "success",
		message: message ?? "Success",
		data: data ?? null,
	});
}

export { AppResponse };
