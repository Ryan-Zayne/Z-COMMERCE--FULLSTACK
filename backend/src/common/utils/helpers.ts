import type { UserType } from "@/users/types";
import { omitKeys } from "@zayne-labs/toolkit";
import type { UnmaskType } from "@zayne-labs/toolkit/type-helpers";
import type { CookieOptions, Response } from "express";
import { isProduction } from "../constants";

type PossibleCookieNames = UnmaskType<"zayneAccessToken" | "zayneRefreshToken">;

export const setCookie = (
	res: Response,
	name: PossibleCookieNames,
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

export const removeCookie = (res: Response, name: PossibleCookieNames) => {
	res.cookie(name, "expired", { maxAge: -1 });
};

export const omitSensitiveFields = (userObject: UserType, omitArray: Array<keyof UserType> = []) => {
	const safeUserObjectObject = omitKeys(userObject, ["updatedAt", ...omitArray]);

	return safeUserObjectObject;
};
