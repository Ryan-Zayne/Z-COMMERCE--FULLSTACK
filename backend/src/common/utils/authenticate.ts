import { type DecodedJwtPayload, decodeJwtToken, encodeJwtToken } from "@/auth/services";
import { ENVIRONMENT } from "@/common/env";
import { UserModel } from "@/users/model";
import type { UserType } from "@/users/types";
import jwt from "jsonwebtoken";
import type { Require_id } from "mongoose";
import { AppError } from "./appError";

const handleUserVerification = async (decodedPayload: DecodedJwtPayload, zayneRefreshToken: string) => {
	const user = (await UserModel.findOne({ _id: decodedPayload.id }).select([
		"+refreshTokenArray",
		"+isSuspended",
		"+isEmailVerified",
	])) as Require_id<UserType>;

	/* Check if refresh token matches the stored refresh tokens in db
		in case the user has logged out and the token is still valid
		or the user has re authenticated and the token is still valid etc
	*/
	if (!user.refreshTokenArray.includes(zayneRefreshToken)) {
		throw new AppError(401, "Invalid token. Please log in again!");
	}

	if (user.isSuspended) {
		throw new AppError(401, "Your account is currently suspended");
	}

	// TODO csrf protection
	// TODO browser client fingerprinting

	return user;
};

const handleAccessTokenRefresh = async (zayneRefreshToken: string) => {
	try {
		const decodedPayload = decodeJwtToken(zayneRefreshToken, { secretKey: ENVIRONMENT.REFRESH_SECRET });

		const currentUser = await handleUserVerification(decodedPayload, zayneRefreshToken);

		// generate access tokens
		const newZayneAccessToken = encodeJwtToken(decodedPayload, {
			expiresIn: ENVIRONMENT.ACCESS_JWT_EXPIRES_IN,
		});

		return { currentUser, newZayneAccessToken };

		// Handle errors
	} catch (error) {
		console.error(error);

		throw new AppError(401, "Session expired, please log in again", { cause: error });
	}
};

type RawSignedCookies = {
	zayneAccessToken: string | undefined;
	zayneRefreshToken: string | undefined;
};

const authenticate = async (tokens: RawSignedCookies) => {
	const { zayneAccessToken, zayneRefreshToken } = tokens;

	if (!zayneRefreshToken) {
		throw new AppError(401, "Unauthorized");
	}

	try {
		if (!zayneAccessToken) {
			// if access token is not present, verify the refresh token and generate a new access token
			const userInfoWithNewToken = await handleAccessTokenRefresh(zayneRefreshToken);

			return userInfoWithNewToken;
		}

		const decodedPayload = decodeJwtToken(zayneAccessToken);

		const currentUser = await handleUserVerification(decodedPayload, zayneRefreshToken);

		return { currentUser, newZayneAccessToken: null };
	} catch (error) {
		if (
			zayneRefreshToken &&
			(error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError)
		) {
			// verify the refresh token and generate a new access token
			return handleAccessTokenRefresh(zayneRefreshToken);
		}

		throw new AppError(401, "An error occurred, please log in again");
	}
};

export { authenticate };
