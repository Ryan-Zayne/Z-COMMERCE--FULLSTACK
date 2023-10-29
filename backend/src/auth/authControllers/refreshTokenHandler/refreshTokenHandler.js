import { asyncHandler } from '../../../common/utils/asyncHandler.utils.js';
import UserModel from '../../../users/user.model.js';
import {
	clearExistingCookie,
	decodeJwtToken,
	generateAccessToken,
	generateRefreshToken,
	setCookieAndSendResponse,
} from '../../auth.services.js';

// @desc Refresh the access token
// @route GET /api/auth/refresh
// @access Private
const refreshTokenHandler = asyncHandler(async (req, res) => {
	const { refreshToken } = req.signedCookies;
	const user = req.userWithToken;

	clearExistingCookie(res);

	try {
		const decodedPayload = decodeJwtToken(refreshToken, process.env.REFRESH_SECRET);

		if (user.id !== decodedPayload.userId) {
			res.status(403);
			throw new Error('Access is forbidden!');
		}

		const newAccessToken = generateAccessToken(decodedPayload.userId);
		const newRefreshToken = generateRefreshToken(decodedPayload.userId, { expiresIn: '15m' });

		const updatedTokenArray = user.refreshTokenArray.map((token) => {
			const isTargetToken = crypto.timingSafeEqual(Buffer.from(token), Buffer.from(refreshToken));

			if (isTargetToken) {
				return newRefreshToken;
			}

			return token;
		});

		await UserModel.findByIdAndUpdate(user.id, { refreshTokenArray: updatedTokenArray });

		setCookieAndSendResponse({
			res,
			accessToken: newAccessToken,
			newRefreshToken,
		});

		// Catch error thrown when token is no longer valid so we remove the invalid refreshToken
	} catch (error) {
		const filteredTokenArray = user.refreshTokenArray.filter((token) => token !== refreshToken);

		await UserModel.findByIdAndUpdate(user.id, { refreshTokenArray: filteredTokenArray });

		res.status(401);
		throw new Error(error.message);
	}
});

export { refreshTokenHandler };
