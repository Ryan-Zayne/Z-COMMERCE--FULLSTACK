import { type DecodedJwtPayload, decodeJwtToken } from "@/app/auth/services";
import { UserModel } from "@/app/users/model";
import type { UserType } from "@/app/users/types";
import { ENVIRONMENT } from "@/config/env";
import { AppError } from "@/utils";
import { defineEnum } from "@zayne-labs/toolkit/type-helpers";

// eslint-disable-next-line import/default
import jwt from "jsonwebtoken";
import type { HydratedDocument } from "mongoose";

// Error messages
const AUTH_ERRORS = defineEnum({
	ACCOUNT_SUSPENDED: "Your account is currently suspended",
	// GENERIC_ERROR: "An error occurred, please log in again",
	INVALID_TOKEN: "Invalid token. Please log in again!",
	SESSION_EXPIRED: "Session expired, please log in again",
	UNAUTHORIZED: "Unauthorized",
	USER_NOT_FOUND: "User not found or not logged in",
});

/**
 * @description This function is used to verify that user status
 * @returns The current user
 * @throws { AppError } with status code `401` if the user is not found
 * @throws { AppError } with status code `401` if the refresh token is invalid
 * @throws { AppError } with status code `401` if the user is suspended
 */
const validateUserStatus = async (decodedPayload: DecodedJwtPayload, zayneRefreshToken: string) => {
	// == Check if user exists
	const user = await UserModel.findById(decodedPayload.id).select(["+refreshTokenArray", "+isSuspended"]);

	if (!user) {
		throw new AppError(404, AUTH_ERRORS.USER_NOT_FOUND);
	}

	/*
	== Check if refresh token matches the stored refresh tokens in db,
	== in case the user has logged out and the token is still valid,
   == or the user has re authenticated and the token is still valid etc
	*/

	if (!user.refreshTokenArray.includes(zayneRefreshToken)) {
		await UserModel.findByIdAndUpdate(user.id, { refreshTokenArray: [] });

		throw new AppError(401, AUTH_ERRORS.INVALID_TOKEN);
	}

	if (user.isSuspended) {
		throw new AppError(401, AUTH_ERRORS.ACCOUNT_SUSPENDED);
	}

	// TODO csrf protection
	// TODO browser client fingerprinting

	return user;
};

/**
 * @description This function is used to validate the refresh token and generate a new access and refresh token
 * @returns The current user, the new access token and refresh token
 * @throws { AppError } with status code `401` if the refresh token is invalid
 */
const getRenewedUserSession = async (zayneRefreshToken: string) => {
	const decodedRefreshPayload = decodeJwtToken(zayneRefreshToken, {
		secretKey: ENVIRONMENT.REFRESH_SECRET,
	});

	const currentUser = await validateUserStatus(decodedRefreshPayload, zayneRefreshToken);

	const newZayneAccessToken = currentUser.generateAccessToken();

	const newZayneRefreshToken = currentUser.generateRefreshToken();

	const authenticatedSession = {
		currentUser,
		newZayneAccessToken,
		newZayneRefreshToken,
	};

	return authenticatedSession;
};

type TokenPairFromCookies = {
	zayneAccessToken: string | undefined;
	zayneRefreshToken: string | undefined;
};

type AuthenticatedSession = {
	currentUser: HydratedDocument<UserType>;
	newZayneAccessToken?: string;
	newZayneRefreshToken?: string;
};

/**
 * @description Main authentication function that validates or refreshes user sessions
 * Handles both initial authentication and token refresh scenarios
 */
const authenticateUser = async (tokens: TokenPairFromCookies): Promise<AuthenticatedSession> => {
	const { zayneAccessToken, zayneRefreshToken } = tokens;

	if (!zayneRefreshToken) {
		throw new AppError(401, AUTH_ERRORS.UNAUTHORIZED);
	}

	try {
		// == If access token is not present, verify the refresh token and generate new tokens
		if (!zayneAccessToken) {
			return await getRenewedUserSession(zayneRefreshToken);
		}

		// == Else, validate existing session
		const decodedAccessPayload = decodeJwtToken(zayneAccessToken, {
			secretKey: ENVIRONMENT.ACCESS_SECRET,
		});

		const currentUser = await validateUserStatus(decodedAccessPayload, zayneRefreshToken);

		return { currentUser };

		// Handle errors
	} catch (error) {
		// == Attempt session renewal if the error indicates that the access token is invalid / expired
		if (error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError) {
			return getRenewedUserSession(zayneRefreshToken);
		}

		// == Else rethrow the error
		const errorMessage = error instanceof AppError ? error.message : AUTH_ERRORS.SESSION_EXPIRED;

		throw new AppError(401, errorMessage, { cause: error });
	}
};

export { authenticateUser };
