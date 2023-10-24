import { asyncHandler } from '../../common/utils/asyncHandler.utils.js';
import { isDevMode } from '../../common/utils/constants.js';
import UserModel from '../../users/user.model.js';
import { clearExistingCookie, generateAccessToken, generateRefreshToken } from '../auth.services.js';

const setCookieAndSendResponse = ({ res, user, newRefreshToken, accessToken }) => {
	res.cookie('refreshToken', newRefreshToken, {
		sameSite: 'strict',
		secure: !isDevMode,
		httpOnly: true,
		signed: true,
		maxAge: 24 * 60 * 60 * 1000,
	});

	res.json({ username: user.username, email: user.email, accessToken });
};

// @desc Login User
// @route POST /api/auth/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
	const { refreshToken } = req.signedCookies;
	const { email, password } = req.validatedBody;

	const user = await UserModel.findOne({ email }).select('+password');
	const isValidPassword = Boolean(await user?.comparePassword(password));

	if (!isValidPassword) {
		res.status(401);
		throw new Error('Invalid email or password!');
	}

	const accessToken = generateAccessToken(user.id);
	const newRefreshToken = generateRefreshToken(user.id, { expiresIn: '15m' });

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
