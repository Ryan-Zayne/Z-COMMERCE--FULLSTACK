import type { Response } from "express";

const AppResponse = <TExtraData extends Record<string, unknown>>(
	res: Response,
	statusCode: number,
	message?: string,
	extraData?: TExtraData
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
