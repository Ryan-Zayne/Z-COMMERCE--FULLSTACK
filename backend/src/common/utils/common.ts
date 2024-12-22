import type { HydratedUserType, UserType } from "@/users/types";
import { omitKeys } from "@zayne-labs/toolkit/core";
import type { UnmaskType } from "@zayne-labs/toolkit/type-helpers";
import type { CookieOptions, Response } from "express";
import type { AnyObject } from "mongoose";
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

export const omitSensitiveFields = <TObject extends AnyObject, TOmitArray extends Array<keyof UserType>>(
	userObject: TObject | null,
	keysToOmit: TOmitArray = [] as never
) => {
	if (!userObject) {
		return null;
	}

	// == Use JSON.parse and JSON.stringify to clone the user object, to prevent omitKeys from transforming the object to mongodb nonsense
	// eslint-disable-next-line unicorn/prefer-structured-clone
	const clonedUserObject = JSON.parse(JSON.stringify(userObject)) as HydratedUserType;

	const safeUserObject = omitKeys(clonedUserObject, [
		"_id",
		"updatedAt",
		"createdAt",
		"lastLogin",
		"refreshTokenArray",
		"loginRetries",
		"password",
		...keysToOmit,
	]);

	return safeUserObject;
};
