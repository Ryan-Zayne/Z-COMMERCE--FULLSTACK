import { type DecodedJwtPayload, decodeJwtToken, encodeJwtToken } from "@/auth/services";
import { ENVIRONMENT } from "@/common/env";
import { UserModel } from "@/users/model";
import jwt from "jsonwebtoken";
import { ACCESS_JWT_EXPIRES_IN } from "../../constants";
import { AppError } from "../../utils/appError";

const verifyUser = async (decodedPayload: DecodedJwtPayload, zayneRefreshToken: string) => {
	// == Check if user exists
	const user = await UserModel.findById(decodedPayload.id).select(["+refreshTokenArray", "+isSuspended"]);

	if (!user) {
		throw new AppError(401, "User not found");
	}

	// == Check if refresh token matches the stored refresh tokens in db
	// == in case the user has logged out and the token is still valid
	// == or the user has re authenticated and the token is still valid etc

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

const handleAccessTokenRefresh = async (zayneRefreshToken: string) => {
	try {
		const decodedRefreshPayload = decodeJwtToken(zayneRefreshToken, {
			secretKey: ENVIRONMENT.REFRESH_SECRET,
		});

		const currentUser = await verifyUser(decodedRefreshPayload, zayneRefreshToken);

		const newZayneAccessToken = encodeJwtToken(
			{ id: currentUser.id as string },
			{ expiresIn: ACCESS_JWT_EXPIRES_IN }
		);

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

const authenticateUser = async (tokens: RawSignedCookies) => {
	const { zayneAccessToken, zayneRefreshToken } = tokens;

	if (!zayneRefreshToken) {
		throw new AppError(401, "Unauthorized");
	}

	try {
		if (!zayneAccessToken) {
			// == If access token is not present, verify the refresh token and generate a new access token
			const userInfoWithNewToken = await handleAccessTokenRefresh(zayneRefreshToken);

			return userInfoWithNewToken;
		}

		const decodedAccessPayload = decodeJwtToken(zayneAccessToken);

		const currentUser = await verifyUser(decodedAccessPayload, zayneRefreshToken);

		return {
			currentUser,
			newZayneAccessToken: null,
		};

		// Error handling
	} catch (error) {
		// Rethrow error to call site if it's an error throw by au
		if (error instanceof AppError) {
			throw error;
		}

		if (
			zayneRefreshToken &&
			(error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError)
		) {
			// == Verify the refresh token and generate a new access token
			const userInfoWithNewToken = await handleAccessTokenRefresh(zayneRefreshToken);

			return userInfoWithNewToken;
		}

		throw new AppError(401, "An error occurred, please log in again");
	}
};

export { authenticateUser };
