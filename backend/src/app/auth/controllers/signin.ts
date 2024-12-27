import { UserModel } from "@/app/users/model";
import type { HydratedUserType } from "@/app/users/types";
import { ACCESS_JWT_EXPIRES_IN, REFRESH_JWT_EXPIRES_IN } from "@/constants";
import { catchAsync } from "@/middleware";
import { AppError, AppResponse, omitSensitiveFields, setCookie } from "@/utils";
import { differenceInHours } from "date-fns";
import { sendVerificationEmail } from "../services";

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

	const user = await UserModel.findOne({ email }).select(["+password", "+refreshTokenArray"]);

	if (!user) {
		throw new AppError(401, "Email or password is incorrect");
	}

	const isValidPassword = Boolean(await user.verifyPassword(password));

	if (!isValidPassword) {
		// == For every time the password is gotten wrong, increment the login retries by 1
		await UserModel.findByIdAndUpdate(user._id, { $inc: { loginRetries: 1 } });

		throw new AppError(401, "Email or password is incorrect");
	}

	if (!user.isEmailVerified) {
		// FIXME when using queues later change void to await
		void sendVerificationEmail(user as HydratedUserType, req);
	}

	if (user.isSuspended) {
		throw new AppError(401, "Your account is currently suspended");
	}

	// == Check if user has exceeded login retries (3 times in 12 hours)
	const currentRequestTime = new Date();

	const lastLoginRetry = differenceInHours(currentRequestTime, user.lastLogin);

	if (user.loginRetries >= 3 && lastLoginRetry < 12) {
		throw new AppError(401, "Login retries exceeded");

		// TODO: send reset password email to user
	}

	const newZayneAccessToken = user.generateAccessToken();

	const newZayneRefreshToken = user.generateRefreshToken();

	setCookie(res, "zayneAccessToken", newZayneAccessToken, {
		maxAge: ACCESS_JWT_EXPIRES_IN,
	});

	setCookie(res, "zayneRefreshToken", newZayneRefreshToken, {
		maxAge: REFRESH_JWT_EXPIRES_IN,
	});

	const existingRefreshTokenArray = user.refreshTokenArray.includes(zayneRefreshToken)
		? user.refreshTokenArray.filter((token) => token !== zayneRefreshToken)
		: [];

	// == update user loginRetries to 0 and lastLogin to current time
	const updatedUser = await UserModel.findByIdAndUpdate(
		user.id,
		{
			lastLogin: Date.now(),
			loginRetries: 0,
			newZayneRefreshToken,
			refreshTokenArray: [...existingRefreshTokenArray, newZayneRefreshToken],
		},
		{ new: true }
	);

	return AppResponse(res, 200, "Signed in successfully", { user: omitSensitiveFields(updatedUser) });
});

export { signIn };
