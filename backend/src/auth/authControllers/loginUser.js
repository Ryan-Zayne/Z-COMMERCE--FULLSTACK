import { asyncHandler } from '../../common/utils/asyncHandler.utils.js';
import { isDevMode } from '../../common/utils/constants.js';
import UserModel from '../../users/user.model.js';
import { clearExistingCookie, generateAccessToken, generateRefreshToken } from '../auth.services.js';

// @desc Login User
// @route POST /api/auth/login
// @access Public

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

	let newTokenArray = !refreshToken
		? user.refreshTokenArray
		: user.refreshTokenArray.filter((token) => token !== refreshToken);

	if (refreshToken) {
		clearExistingCookie(res);

		const userWithToken = await UserModel.findOne({ refreshTokenArray: refreshToken });

		// Clearing out the refresh tokens in the DB in case of token reuse on login
		newTokenArray = !userWithToken ? [] : newTokenArray;
	}

	await UserModel.findByIdAndUpdate(user.id, { refreshTokenArray: [...newTokenArray, newRefreshToken] });

	res.cookie('refreshToken', newRefreshToken, {
		sameSite: 'strict',
		secure: !isDevMode,
		httpOnly: true,
		signed: true,
		maxAge: 24 * 60 * 60 * 1000,
	});

	res.json({ username: user.username, email: user.email, accessToken });
});

export { loginUser };
