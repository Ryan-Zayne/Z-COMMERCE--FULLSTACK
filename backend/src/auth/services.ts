import { ENVIRONMENT } from "@/common/env";
import type { HydratedUserType } from "@/users/types";
import bcryptjs from "bcryptjs";
import jwt, { type SignOptions } from "jsonwebtoken";
import type { CallbackWithoutResultAndOptionalError } from "mongoose";

export type DecodedJwtPayload = {
	id: string;
	token?: string;
};

type JwtOptions<TExtraOptions> = TExtraOptions & {
	secretKey?: string;
};

export const decodeJwtToken = (token: string, options: JwtOptions<jwt.VerifyOptions> = {}) => {
	const { secretKey = ENVIRONMENT.ACCESS_SECRET, ...restOfOptions } = options;

	const decodedPayload = jwt.verify(token, secretKey, restOfOptions) as DecodedJwtPayload;

	return decodedPayload;
};

export const encodeJwtToken = (payload: DecodedJwtPayload, options: JwtOptions<jwt.SignOptions>) => {
	const { secretKey = ENVIRONMENT.ACCESS_SECRET, ...restOfOptions } = options;

	const encodedToken = jwt.sign(payload, secretKey, restOfOptions);

	return encodedToken;
};

export function generateAccessToken(this: HydratedUserType, options: SignOptions = {}) {
	const { expiresIn = ENVIRONMENT.ACCESS_JWT_EXPIRES_IN } = options;

	const payLoad = {
		id: this.id,
	};

	const accessToken = encodeJwtToken(payLoad, { expiresIn });

	return accessToken;
}

export function generateRefreshToken(this: HydratedUserType, options: SignOptions = {}) {
	const { expiresIn = ENVIRONMENT.REFRESH_JWT_EXPIRES_IN } = options;

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
