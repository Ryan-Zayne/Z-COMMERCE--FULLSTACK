import { asyncHandler } from "../../common/lib/utils/asyncHandler.utils.js";
import UserModel from "../../users/user.model.js";
import { clearExistingCookie } from "../auth.services.js";

// @desc Logout User
// @route GET /api/auth/logout
// @access Private
const logoutUser = asyncHandler(async (req, res) => {
	const { refreshToken } = req.signedCookies;

	clearExistingCookie(res);

	// No token, hence no user to log out
	if (!refreshToken) {
		res.sendStatus(204);
		return;
	}

	// prettier-ignore
	const userWithToken = await UserModel
		.findOne({ refreshTokenArray: refreshToken })
		.select('+refreshTokenArray');

	// Token Reuse detected but doesn't matter since logout is happening
	if (!userWithToken) {
		res.sendStatus(204);
		return;
	}

	const updatedTokenArray = userWithToken.refreshTokenArray.filter((token) => token !== refreshToken);

	await UserModel.findByIdAndUpdate(userWithToken.id, { refreshTokenArray: updatedTokenArray });

	res.sendStatus(204);
});

export { logoutUser };
