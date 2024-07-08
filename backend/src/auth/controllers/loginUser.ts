import { asyncHandler } from "@/common/lib/utils";
import UserModel from "@/users/model";
import {
	clearExistingCookie,
	generateAccessToken,
	generateRefreshToken,
	setCookieAndSendResponse,
} from "../services";

// @route POST /api/auth/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
	const { refreshToken } = req.signedCookies;
	const { email, password } = req.validatedBody;

	const user = await UserModel.findOne({ email }).select(["+password", "+refreshTokenArray"]);
	const isValidPassword = Boolean(await user?.comparePassword(password));

	if (!isValidPassword) {
		res.status(401);
		throw new Error("Invalid email or password!");
	}

	const accessToken = generateAccessToken(user.id);
	const newRefreshToken = generateRefreshToken(user.id, { expiresIn: "15m" });

	if (!refreshToken) {
		await UserModel.findByIdAndUpdate(user.id, {
			refreshTokenArray: [...user.refreshTokenArray, newRefreshToken],
		});

		setCookieAndSendResponse({
			res,
			user,
			accessToken,
			newRefreshToken,
		});

		return;
	}

	const existingUserWithToken = Boolean(await UserModel.exists({ refreshTokenArray: refreshToken }));

	// Clearing all the refresh tokens already in the DB in case of token reuse situation on login
	const updatedTokenArray = existingUserWithToken
		? user.refreshTokenArray.filter((token) => token !== refreshToken)
		: [];

	await UserModel.findByIdAndUpdate(user.id, {
		refreshTokenArray: [...updatedTokenArray, newRefreshToken],
	});

	clearExistingCookie(res);

	setCookieAndSendResponse({
		res,
		user,
		accessToken,
		newRefreshToken,
	});
});

export { loginUser };
