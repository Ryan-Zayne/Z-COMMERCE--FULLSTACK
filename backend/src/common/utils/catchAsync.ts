import type { NextFunction, Request, Response } from "express";
import type { Prettify } from "../type-helpers/global";

type ModifiedRequest<TRequestSupplement> = Omit<Request, "body" | "signedCookies"> &
	Prettify<
		{
			body: Record<string, unknown> | undefined;
			signedCookies: Record<string, string | undefined>;
		} & TRequestSupplement
	>;

type RequestHandler<TRequestSupplement = unknown> = (
	req: ModifiedRequest<TRequestSupplement>,
	res: Response,
	next: NextFunction
	// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
) => Promise<unknown> | unknown;

const catchAsync = <TRequestSupplement>(handlerFn: RequestHandler<TRequestSupplement>) => {
	const safeControllerFn: RequestHandler<TRequestSupplement> = async (req, res, next) => {
		try {
			const result = await handlerFn(req, res, next);

			return result;
			// Forward error to error handler
		} catch (error) {
			next(error);

			return null;
		}
	};

	return safeControllerFn as RequestHandler;
};

export { catchAsync };
