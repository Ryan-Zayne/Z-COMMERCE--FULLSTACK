import { isProduction } from "@/common/constants";
import type { HydratedUserType } from "@/users/types";
import bcryptjs from "bcryptjs";
import type { Response } from "express";
import jwt, { type SignOptions } from "jsonwebtoken";
import type { CallbackWithoutResultAndOptionalError } from "mongoose";

export function generateAccessToken(this: HydratedUserType, options: SignOptions = {}) {
	const { expiresIn = "5m" } = options;

	const payLoad = { userId: this.id };

	const accessToken = jwt.sign(payLoad, process.env.ACCESS_SECRET, { expiresIn });

	return accessToken;
}

export function generateRefreshToken(this: HydratedUserType, options: SignOptions = {}) {
	const { expiresIn = "15m" } = options;

	const payLoad = { userId: this.id };

	const refreshToken = jwt.sign(payLoad, process.env.REFRESH_SECRET, { expiresIn });

	return refreshToken;
}

export async function hashPassword(this: HydratedUserType, next: CallbackWithoutResultAndOptionalError) {
	if (!this.isModified("password")) {
		next();
	}

	const saltRounds = 12;

	this.password = await bcryptjs.hash(this.password, saltRounds);
}

export async function verifyPassword(this: HydratedUserType, plainPassword: string) {
	if (!this.password) {
		return false;
	}

	const isValidPassword = await bcryptjs.compare(plainPassword, this.password);

	return isValidPassword;
}

export const decodeJwtToken = (token: string, secretKey: string) => {
	const decodedPayload = jwt.verify(token, secretKey) as { userId: string };

	return decodedPayload;
};

export const clearExistingCookie = (res: Response) => {
	res.clearCookie("refreshToken", {
		sameSite: "none",
		secure: isProduction,
		httpOnly: true,
		signed: true,
	});
};
