import type { CookieOptions, Response } from "express";
import { isProduction } from "../constants";

export const setCookie = (
	res: Response,
	name: string,
	value: string | number,
	options: CookieOptions = {}
) => {
	res.cookie(name, value, {
		sameSite: isProduction ? "none" : "lax",
		secure: isProduction,
		httpOnly: true,
		signed: true,
		partitioned: isProduction,
		...options,
	});
};
