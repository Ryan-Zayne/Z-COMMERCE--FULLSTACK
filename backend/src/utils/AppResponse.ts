import type { Response } from "express";

const AppResponse = (
	res: Response,
	statusCode: number,
	message?: string,
	data?: Record<string, unknown>
) => {
	/* eslint-disable perfectionist/sort-objects */
	const jsonResponse = {
		status: "success",
		success: true,
		message,
		...(Boolean(data) && { data }),
		/* eslint-enable perfectionist/sort-objects */
	};

	res.status(statusCode).json(jsonResponse);
};

export { AppResponse };
