import { type DecodedJwtPayload, decodeJwtToken, encodeJwtToken } from "@/app/auth/services";
import { UserModel } from "@/app/users/model";
import { ENVIRONMENT } from "@/config/env";
import { consola } from "consola";
import jwt from "jsonwebtoken";
import { ACCESS_JWT_EXPIRES_IN } from "../../constants";
import { AppError } from "../../utils/AppError";

/**
 * @description This function is used to verify the refresh token and generate a new access token
 * @returns The current user and the new access token
 * @throws An AppError with status code `401` if the user is not found
 * @throws An AppError with status code `401` if the refresh token is invalid
 * @throws An AppError with status code `401` if the user is suspended
 */
const verifyUser = async (decodedPayload: DecodedJwtPayload, zayneRefreshToken: string) => {
	// == Check if user exists
	const user = await UserModel.findById(decodedPayload.id).select(["+refreshTokenArray", "+isSuspended"]);

	if (!user) {
		throw new AppError(401, "User not found");
	}

	/*
	== Check if refresh token matches the stored refresh tokens in db,
	== in case the user has logged out and the token is still valid,
   == or the user has re authenticated and the token is still valid etc
	*/

	if (!user.refreshTokenArray.includes(zayneRefreshToken)) {
		await UserModel.findByIdAndUpdate(user.id, { refreshTokenArray: [] });

		throw new AppError(401, "Invalid token. Please log in again!");
	}

	if (user.isSuspended) {
		throw new AppError(401, "Your account is currently suspended");
	}

	// TODO csrf protection
	// TODO browser client fingerprinting

	return user;
};

/**
 * @description This function is used to verify the refresh token and generate a new access token
 * @returns The current user and the new access token
 * @throws An AppError with status code `401` if the refresh token is invalid
 */
const handleAccessTokenRefresh = async (zayneRefreshToken: string) => {
	try {
		const decodedRefreshPayload = decodeJwtToken(zayneRefreshToken, {
			secretKey: ENVIRONMENT.REFRESH_SECRET,
		});

		const currentUser = await verifyUser(decodedRefreshPayload, zayneRefreshToken);

		const newZayneAccessToken = encodeJwtToken(
			{ id: currentUser.id as string },
			{ expiresIn: ACCESS_JWT_EXPIRES_IN, secretKey: ENVIRONMENT.ACCESS_SECRET }
		);

		return {
			currentUser,
			newZayneAccessToken,
		};

		// == Handle errors
	} catch (error) {
		consola.error(error);

		throw new AppError(401, "Session expired, please log in again", { cause: error });
	}
};

type RawSignedCookies = {
	zayneAccessToken: string | undefined;
	zayneRefreshToken: string | undefined;
};

const authenticateUser = async (tokens: RawSignedCookies) => {
	const { zayneAccessToken, zayneRefreshToken } = tokens;

	if (!zayneRefreshToken) {
		throw new AppError(401, "Unauthorized");
	}

	if (!zayneAccessToken) {
		// == If access token is not present, verify the refresh token and generate a new access token
		const userInfoWithNewToken = await handleAccessTokenRefresh(zayneRefreshToken);

		return userInfoWithNewToken;
	}

	try {
		const decodedAccessPayload = decodeJwtToken(zayneAccessToken, {
			secretKey: ENVIRONMENT.ACCESS_SECRET,
		});

		const currentUser = await verifyUser(decodedAccessPayload, zayneRefreshToken);

		return { currentUser, newZayneAccessToken: null };

		// == Error handling
	} catch (error) {
		// == If the refresh token is present and error is a JsonWebTokenError or TokenExpiredError, Verify the refresh token and generate a new access token

		const isEligibleForAccessTokenRefresh =
			zayneRefreshToken &&
			(error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError);

		if (isEligibleForAccessTokenRefresh) {
			const userInfoWithNewToken = await handleAccessTokenRefresh(zayneRefreshToken);

			return userInfoWithNewToken;
		}

		throw new AppError(401, "An error occurred, please log in again");
	}
};

export { authenticateUser };
