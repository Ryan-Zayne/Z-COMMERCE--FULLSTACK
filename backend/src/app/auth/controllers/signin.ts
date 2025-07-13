import { consola } from "consola";
import { differenceInHours } from "date-fns";
import { UserModel } from "@/app/users/model";
import type { HydratedUserType } from "@/app/users/types";
import { ENVIRONMENT } from "@/config/env";
import { catchAsync } from "@/middleware";
import { AppError, AppResponse, omitSensitiveFields, setCookie } from "@/utils";
import { type SigninBodySchemaType, sendVerificationEmail } from "../services";

// @route POST /api/auth/login
// @access Public
const signIn = catchAsync<{
	body: SigninBodySchemaType;
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

	const isValidPassword = await currentUser.verifyPassword(password);

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

	const updatedTokenArray = getUpdatedTokenArray(currentUser as HydratedUserType, zayneRefreshToken);

	const updatedUser = await UserModel.findByIdAndUpdate(
		currentUser.id,
		{
			// == Update user loginRetries to 0 and lastLogin to current time
			loginRetries: 0,
			// eslint-disable-next-line perfectionist/sort-objects
			lastLogin: Date.now(),
			refreshTokenArray: [...updatedTokenArray, newZayneRefreshToken],
		},
		{ new: true }
	);

	return AppResponse(res, 200, "Signed in successfully", {
		user: omitSensitiveFields(updatedUser, ["isDeleted"], { replaceId: true }),
	});
});

export { signIn };

const getUpdatedTokenArray = (currentUser: HydratedUserType, zayneRefreshToken: string): string[] => {
	if (!zayneRefreshToken) {
		return currentUser.refreshTokenArray;
	}

	if (currentUser.refreshTokenArray.includes(zayneRefreshToken)) {
		const updatedTokenArray = currentUser.refreshTokenArray.filter((t) => t !== zayneRefreshToken);

		return updatedTokenArray;
	}

	// == At this point where the refreshToken is not in the array, the question is why would a user be signing in with a refreshToken that is not in the array?
	// == So it can be seen as a token reuse situation. Whether it's valid or not is not even up for question.
	// == Is it a possible token reuse attack or not? E no concern me.
	// == Just log out the user from all devices by removing all tokens from the array to avoid any possible wahala
	consola.warn({
		message: "Possible token reuse detected!",
		timestamp: new Date().toISOString(),
		userId: currentUser.id,
	});

	return [];
};
