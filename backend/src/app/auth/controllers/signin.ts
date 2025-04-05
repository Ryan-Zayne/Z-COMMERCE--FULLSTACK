import { UserModel } from "@/app/users/model";
import type { HydratedUserType, UserType } from "@/app/users/types";
import { ENVIRONMENT } from "@/config/env";
import { catchAsync } from "@/middleware";
import { AppError, AppResponse, omitSensitiveFields, setCookie } from "@/utils";
import { differenceInHours } from "date-fns";
import type { HydratedDocument } from "mongoose";
import { decodeJwtToken, sendVerificationEmail } from "../services";

// eslint-disable-next-line import/default
import jwt from "jsonwebtoken";

type Context = {
	currentUser: HydratedDocument<UserType>;
	newZayneRefreshToken: string;
	zayneRefreshToken: string;
};

const manageTokenRefresh = async (context: Context) => {
	const { currentUser, newZayneRefreshToken, zayneRefreshToken } = context;

	// If there's no reuse, simply filter
	if (currentUser.refreshTokenArray.includes(zayneRefreshToken)) {
		const updatedTokenArray = [
			...currentUser.refreshTokenArray.filter((t) => t !== zayneRefreshToken),
			newZayneRefreshToken,
		];

		const updatedUser = await UserModel.findByIdAndUpdate(
			currentUser.id,
			{ refreshTokenArray: updatedTokenArray },
			{ new: true }
		);

		return updatedUser;
	}

	try {
		decodeJwtToken(zayneRefreshToken, {
			secretKey: ENVIRONMENT.REFRESH_SECRET,
		});

		const updatedTokenArray = [newZayneRefreshToken];

		// If we get here, token is valid but not in array - security breach!
		// Clear all tokens and only keep the new one
		const updatedUser = await UserModel.findByIdAndUpdate(
			currentUser.id,
			{ refreshTokenArray: updatedTokenArray },
			{ new: true }
		);

		return updatedUser;

		// If the token is invalid or expired, add the new token
	} catch (error) {
		if (error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError) {
			// Token is invalid or expired - just add the new token
			const updatedUser = await UserModel.findByIdAndUpdate(
				currentUser.id,
				{ refreshTokenArray: [...currentUser.refreshTokenArray, newZayneRefreshToken] },
				{ new: true }
			);

			return updatedUser;
		}

		throw error;
	}
};

// @route POST /api/auth/login
// @access Public
const signIn = catchAsync<{
	body: Pick<HydratedUserType, "email" | "password">;
	signedCookies: {
		zayneRefreshToken: string;
	};
}>(async (req, res) => {
	const { zayneRefreshToken } = req.signedCookies;

	const { email, password } = req.body;

	const currentUser = await UserModel.findOne({ email }).select(["+password", "+refreshTokenArray"]);

	if (!currentUser) {
		throw new AppError(401, "Email or password is incorrect");
	}

	const isValidPassword = Boolean(await currentUser.verifyPassword(password));

	if (!isValidPassword) {
		// == For every time the password is gotten wrong, increment the login retries by 1
		await UserModel.findByIdAndUpdate(currentUser._id, { $inc: { loginRetries: 1 } });

		throw new AppError(401, "Email or password is incorrect");
	}

	if (!currentUser.isEmailVerified) {
		// FIXME when using queues later change void to await
		void sendVerificationEmail(currentUser as HydratedUserType);
	}

	if (currentUser.isSuspended) {
		throw new AppError(401, "Your account is currently suspended");
	}

	// == Check if user has exceeded login retries (3 times in 12 hours)
	const currentRequestTime = new Date();

	const lastLoginRetry = differenceInHours(currentRequestTime, currentUser.lastLogin);

	if (currentUser.loginRetries >= 3 && lastLoginRetry < 12) {
		throw new AppError(401, "Login retries exceeded");

		// TODO: send reset password email to user
	}

	const newZayneAccessToken = currentUser.generateAccessToken();

	const newZayneRefreshToken = currentUser.generateRefreshToken();

	setCookie(res, "zayneAccessToken", newZayneAccessToken, {
		maxAge: ENVIRONMENT.ACCESS_JWT_EXPIRES_IN,
	});

	setCookie(res, "zayneRefreshToken", newZayneRefreshToken, {
		maxAge: ENVIRONMENT.REFRESH_JWT_EXPIRES_IN,
	});

	const updatedTokenArray = [
		...currentUser.refreshTokenArray.filter((t) => t !== zayneRefreshToken),
		newZayneRefreshToken,
	];

	const updatedUser = await UserModel.findByIdAndUpdate(
		currentUser.id,
		{
			lastLogin: Date.now(),
			// == Update user loginRetries to 0 and lastLogin to current time
			loginRetries: 0,
			newZayneRefreshToken,
			refreshTokenArray: updatedTokenArray,
		},
		{ new: true }
	);

	return AppResponse(res, 200, "Signed in successfully", { user: omitSensitiveFields(updatedUser) });
});

export { signIn };
