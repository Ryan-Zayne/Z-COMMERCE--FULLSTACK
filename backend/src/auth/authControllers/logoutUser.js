import { asyncHandler } from '../../common/utils/asyncHandler.utils.js';
import UserModel from '../../users/user.model.js';
import { clearExistingCookie } from '../auth.services.js';

// @desc Logout User
// @route GET /api/auth/logout
// @access Private
const logoutUser = asyncHandler(async (req, res) => {
	const { refreshToken } = req.signedCookies;

	clearExistingCookie(res);

	if (!refreshToken) {
		res.sendStatus(204); // No content status
		return;
	}

	const userWithToken = await UserModel.findOne({ refreshTokenArray: refreshToken }).select(
		'+refreshTokenArray'
	);

	if (!userWithToken) {
		res.sendStatus(204); // No content status
		return;
	}

	const updatedTokenArray = userWithToken.refreshTokenArray.filter((token) => token !== refreshToken);

	await UserModel.findByIdAndUpdate(userWithToken.id, { refreshTokenArray: updatedTokenArray });

	res.sendStatus(204);
});

export { logoutUser };
