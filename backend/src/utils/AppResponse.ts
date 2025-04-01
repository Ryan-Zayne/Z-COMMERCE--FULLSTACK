import type { Response } from "express";

const AppResponse = (
	res: Response,
	statusCode: number,
	message?: string,
	extraData?: Record<string, unknown>
) => {
	const jsonResponse = {
		status: "success",
		// eslint-disable-next-line perfectionist/sort-objects
		message,

		...(Boolean(extraData) && { data: extraData }),
	};

	res.status(statusCode).json(jsonResponse);
};

export { AppResponse };
