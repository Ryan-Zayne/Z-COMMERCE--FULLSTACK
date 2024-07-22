import { AppError, catchAsync, setCookie } from "@/common/utils";
import { AppResponse } from "@/common/utils/appResponse";
import { UserModel } from "@/users/model";
import type { HydratedUserType } from "@/users/types";
import { clearExistingCookie } from "../services";

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

	// Increment the login retries each time the password is gotten wrong
	if (!isValidPassword) {
		await UserModel.findByIdAndUpdate(user._id, {
			$inc: { loginRetries: 1 },
		});

		throw new AppError(401, "Invalid email or password!");
	}

	const accessToken = user.generateAccessToken({ expiresIn: "15m" });

	setCookie(res, "zayneAccessToken", accessToken, {
		maxAge: 15 * 60 * 1000, // 15 minutes
	});

	const refreshToken = user.generateRefreshToken({ expiresIn: "24h" });

	setCookie(res, "zayneRefreshToken", refreshToken, {
		maxAge: 24 * 60 * 60 * 1000, // 24 hours
	});

	if (!zayneRefreshToken) {
		const updatedUser = await UserModel.findByIdAndUpdate(
			user.id,
			{
				refreshTokenArray: [...user.refreshTokenArray, refreshToken],
				logini,
			},
			{ new: true }
		);

		AppResponse(res, 200, "Signed in successfully");

		return;
	}

	const existingUserWithToken = Boolean(await UserModel.exists({ refreshTokenArray: zayneRefreshToken }));

	// Clearing all the refresh tokens already in the DB in case of token reuse situation on login
	const updatedTokenArray = existingUserWithToken
		? user.refreshTokenArray.filter((token) => token !== zayneRefreshToken)
		: [];

	await UserModel.findByIdAndUpdate(user.id, {
		refreshTokenArray: [...updatedTokenArray, refreshToken],
	});

	clearExistingCookie(res);

	setCookie(res, "refreshToken", refreshToken, {
		maxAge: 24 * 60 * 60 * 1000, // 24 hours
	});

	AppResponse(res, 200, "Signed in successfully");
});

export { signInUser };
