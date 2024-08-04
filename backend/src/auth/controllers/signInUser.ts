import { AppError, catchAsync, setCookie } from "@/common/utils";
import { AppResponse } from "@/common/utils/appResponse";
import { UserModel } from "@/users/model";
import type { HydratedUserType } from "@/users/types";
import { differenceInHours } from "date-fns";

// @route POST /api/auth/login
// @access Public
const signInUser = catchAsync<{
	validatedBody: Pick<HydratedUserType, "email" | "password">;
	signedCookies: { zayneRefreshToken: string };
}>(async (req, res) => {
	const { zayneRefreshToken } = req.signedCookies;
	const { email, password } = req.validatedBody;

	const user = await UserModel.findOne({ email }).select(["+password", "+refreshTokenArray"]);

	if (!user) {
		throw new AppError(401, "Invalid email or password!");
	}

	const isValidPassword = Boolean(await user.verifyPassword(password));

	if (!isValidPassword) {
		// == For every time the password is gotten wrong, increment the login retries by 1
		await UserModel.findByIdAndUpdate(user._id, {
			$inc: { loginRetries: 1 },
		});

		throw new AppError(401, "Invalid email or password!");
	}

	if (user.isSuspended) {
		throw new AppError(401, "Your account is currently suspended");
	}

	// == Check if user has exceeded login retries (3 times in 12 hours)
	const currentRequestTime = new Date();

	const lastLoginRetry = differenceInHours(currentRequestTime, user.lastLogin);

	if (user.loginRetries >= 3 && lastLoginRetry < 12) {
		throw new AppError(401, "login retries exceeded!");
		// TODO: send reset password email to user
	}

	const accessToken = user.generateAccessToken({ expiresIn: "15m" });

	setCookie(res, "zayneAccessToken", accessToken, {
		maxAge: 15 * 60 * 1000, // 15 minutes
	});

	const refreshToken = user.generateRefreshToken({ expiresIn: "24h" });

	setCookie(res, "zayneRefreshToken", refreshToken, {
		maxAge: 24 * 60 * 60 * 1000, // 24 hours
	});

	// == update user loginRetries to 0 and lastLogin to current time
	const updatedUser = await UserModel.findByIdAndUpdate(
		user.id,
		{
			loginRetries: 0,
			lastLogin: Date.now(),
			refreshToken,
			refreshTokenArray: [...user.refreshTokenArray, refreshToken],
		},
		{ new: true }
	);

	AppResponse(res, 200, "Signed in successfully");

	// const existingUserWithToken = Boolean(await UserModel.exists({ refreshTokenArray: zayneRefreshToken }));

	// // Clearing all the refresh tokens already in the DB in case of token reuse situation on login
	// const updatedTokenArray = existingUserWithToken
	// 	? user.refreshTokenArray.filter((token) => token !== zayneRefreshToken)
	// 	: [];

	// await UserModel.findByIdAndUpdate(user.id, {
	// 	refreshTokenArray: [...updatedTokenArray, refreshToken],
	// });

	// setCookie(res, "zayneRefreshToken", refreshToken, {
	// 	maxAge: 24 * 60 * 60 * 1000, // 24 hours
	// });

	// AppResponse(res, 200, "Signed in successfully");
});

export { signInUser };
