import { asyncHandler } from '../../common/utils/asyncHandler.utils.js';
import { isDevMode } from '../../common/utils/constants.js';
import UserModel from '../../users/user.model.js';
import { clearExistingCookie, generateAccessToken, generateRefreshToken } from '../auth.services.js';

// @desc Login User
// @route POST /api/auth/login
// @access Public

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

const loginUser = asyncHandler(async (req, res) => {
	const { refreshToken } = req.signedCookies;
	const { email, password } = req.validatedBody;

	const user = await UserModel.findOne({ email });
	const isValidPassword = Boolean(await user?.comparePassword(password));

	if (!isValidPassword) {
		res.status(401);
		throw new Error('Invalid email or password!');
	}

	const accessToken = generateAccessToken(user.id);
	const newRefreshToken = generateRefreshToken(user.id, { expiresIn: '15m' });

	if (!refreshToken) {
		const newTokenArray = [...user.refreshTokenArray, newRefreshToken];

		await UserModel.findByIdAndUpdate(user.id, { refreshTokenArray: newTokenArray });

		setCookieAndSendResponse({
			res,
			user,
			newRefreshToken,
			accessToken,
		});

		return;
	}

	const userWithTokenExists = Boolean(await UserModel.exists({ refreshTokenArray: refreshToken }));

	// Clearing all the refresh tokens already in the DB in case of token reuse situation on login
	const updatedTokenArray = userWithTokenExists
		? user.refreshTokenArray.filter((token) => token !== refreshToken)
		: [];

	await UserModel.findByIdAndUpdate(user.id, {
		refreshTokenArray: [...updatedTokenArray, newRefreshToken],
	});

	clearExistingCookie(res);

	setCookieAndSendResponse({
		res,
		user,
		newRefreshToken,
		accessToken,
	});
});

export { loginUser };
