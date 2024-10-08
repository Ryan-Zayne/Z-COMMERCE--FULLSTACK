import type { UserType } from "@/users/types";
import { omitKeys } from "@zayne-labs/toolkit";
import type { CookieOptions, Response } from "express";
import { isProduction } from "../constants";

export const setCookie = (
	res: Response,
	name: string,
	value: number | string,
	options: CookieOptions = {}
) => {
	res.cookie(name, value, {
		httpOnly: true,
		partitioned: isProduction,
		sameSite: isProduction ? "none" : "lax",
		secure: isProduction,
		signed: true,
		...options,
	});
};

export const omitSensitiveFields = (userObject: UserType, omitArray: Array<keyof UserType> = []) => {
	const safeUserObjectObject = omitKeys(userObject, ["updatedAt", ...omitArray]);

	return safeUserObjectObject;
};
