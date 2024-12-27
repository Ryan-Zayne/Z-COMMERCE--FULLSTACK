import { isObject } from "@zayne-labs/toolkit/type-helpers";
import type { Response } from "express";

type AppResponseParams<TExtraData> =
	| [res: Response, statusCode: number, extraData?: TExtraData & { message?: string }]
	| [res: Response, statusCode: number, message?: string, extraData?: TExtraData];

const AppResponse = <TExtraData extends Record<string, unknown>>(
	...params: AppResponseParams<TExtraData>
) => {
	const [res, statusCode, messageOrExtraData, extraData] = params;

	const jsonResponse = {
		status: "success",
		// eslint-disable-next-line perfectionist/sort-objects
		message: isObject(messageOrExtraData)
			? messageOrExtraData.message ?? "Success"
			: messageOrExtraData ?? "Success",

		...(isObject(messageOrExtraData) && { data: messageOrExtraData }),
		...(Boolean(extraData) && { data: extraData }),
	};

	res.status(statusCode).json(jsonResponse);
};

export { AppResponse };
