import type { HydratedUserType } from "@/app/users/types";
import { ENVIRONMENT } from "@/config/env";
import { ACCESS_JWT_EXPIRES_IN, REFRESH_JWT_EXPIRES_IN } from "@/constants";
import { sendEmail } from "@/services/email";
import { getDomainReferer } from "@/utils";
import bcryptjs from "bcryptjs";
import type { Request } from "express";
import jwt, { type SignOptions } from "jsonwebtoken";
import type { CallbackWithoutResultAndOptionalError } from "mongoose";

type JwtOptions<TExtraOptions> = TExtraOptions & {
	secretKey: string;
};

export type DecodedJwtPayload = {
	id: string;
};

export const decodeJwtToken = <TDecodedPayload extends Record<string, unknown> = DecodedJwtPayload>(
	token: string,
	options: JwtOptions<jwt.VerifyOptions>
) => {
	const { secretKey, ...restOfOptions } = options;

	const decodedPayload = jwt.verify(token, secretKey, restOfOptions) as TDecodedPayload;

	return decodedPayload;
};

export const encodeJwtToken = <TDecodedPayload extends Record<string, unknown> = DecodedJwtPayload>(
	payload: TDecodedPayload,
	options: JwtOptions<jwt.SignOptions>
) => {
	const { secretKey, ...restOfOptions } = options;

	const encodedToken = jwt.sign(payload, secretKey, restOfOptions);

	return encodedToken;
};

export function generateAccessToken(this: HydratedUserType, options: SignOptions = {}) {
	const { expiresIn = ACCESS_JWT_EXPIRES_IN } = options;

	const payLoad = { id: this.id };

	const accessToken = encodeJwtToken(payLoad, { expiresIn, secretKey: ENVIRONMENT.ACCESS_SECRET });

	return accessToken;
}

export function generateRefreshToken(this: HydratedUserType, options: SignOptions = {}) {
	const { expiresIn = REFRESH_JWT_EXPIRES_IN } = options;

	const payLoad = { id: this.id };

	const refreshToken = encodeJwtToken(payLoad, { expiresIn, secretKey: ENVIRONMENT.REFRESH_SECRET });

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

export const sendVerificationEmail = async (user: HydratedUserType, req: Request) => {
	const payload = { id: user.id };

	const emailVerificationToken = encodeJwtToken(payload, {
		expiresIn: "1d",
		secretKey: ENVIRONMENT.EMAIL_SECRET,
	});

	await sendEmail({
		data: {
			email: user.email,
			name: user.username,
			to: user.email,
			verificationLink: `${getDomainReferer("production")}/auth/verify-email/${emailVerificationToken}`,
		},
		type: "welcomeEmail",
	});
};
