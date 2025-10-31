import { UserModel } from "@/app/auth/model";
import { type DecodedJwtPayload, decodeJwtToken } from "@/app/auth/services/common";
import type { UserType } from "@/app/auth/types";
import { ENVIRONMENT } from "@/config/env";
import { AppError } from "@/utils";
import { defineEnum } from "@zayne-labs/toolkit-type-helpers";
import { consola } from "consola";
import jwt from "jsonwebtoken";
import type { HydratedDocument } from "mongoose";

// Error messages
const AUTH_ERRORS = defineEnum({
	ACCOUNT_SUSPENDED: "Your account is currently suspended",
	GENERIC_ERROR: "An error occurred, please log in again",
	INVALID_TOKEN: "Invalid session. Please log in again!",
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
	const currentUser = await UserModel.findById(decodedPayload.id).select([
		"+refreshTokenArray",
		"+isSuspended",
	]);

	if (!currentUser) {
		throw new AppError(404, AUTH_ERRORS.USER_NOT_FOUND);
	}

	// == At this point, the refresh token is still valid but is not in the array
	// == So it can be seen as a token reuse situation
	// == So log out the user from all devices to reduce the risk of another token reuse attack
	if (!currentUser.refreshTokenArray.includes(zayneRefreshToken)) {
		consola.warn({
			message: "Possible token reuse detected!",
			timestamp: new Date().toISOString(),
			userId: currentUser.id as string,
		});

		void currentUser.updateOne({ refreshTokenArray: [] });

		throw new AppError(401, AUTH_ERRORS.INVALID_TOKEN);
	}

	if (currentUser.isSuspended) {
		throw new AppError(401, AUTH_ERRORS.ACCOUNT_SUSPENDED);
	}

	// TODO csrf protection
	// TODO browser client fingerprinting

	return currentUser;
};

/**
 * @description This function is used to validate the refresh token and generate a new access and refresh token
 * @returns The current user, the new access token and refresh token
 * @throws { AppError } with status code `401` if the refresh token is invalid
 */
const getRenewedUserSession = async (zayneRefreshToken: string) => {
	try {
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
	} catch (error) {
		if (error instanceof AppError) {
			throw error;
		}

		// == If the refresh token is invalid, throw an error
		if (error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError) {
			throw new AppError(401, AUTH_ERRORS.SESSION_EXPIRED, { cause: error });
		}

		throw new AppError(401, AUTH_ERRORS.GENERIC_ERROR, { cause: error });
	}
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

	// == If access token is not present, verify the refresh token and generate new tokens
	if (!zayneAccessToken) {
		return getRenewedUserSession(zayneRefreshToken);
	}

	try {
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
		if (error instanceof AppError) {
			throw error;
		}

		throw new AppError(401, AUTH_ERRORS.GENERIC_ERROR, { cause: error });
	}
};

export { authenticateUser };
