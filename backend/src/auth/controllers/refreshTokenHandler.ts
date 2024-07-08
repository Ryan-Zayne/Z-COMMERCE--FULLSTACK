import { asyncHandler } from "@/common/lib/utils";
import UserModel from "@/users/model";
import {
	clearExistingCookie,
	decodeJwtToken,
	generateAccessToken,
	generateRefreshToken,
	setCookieAndSendResponse,
} from "../services";

// @route GET /api/auth/refresh
// @access Private
const refreshTokenHandler = asyncHandler(async (req, res) => {
	const { refreshToken } = req.signedCookies;
	const { userWithToken } = req.user;

	clearExistingCookie(res);

	try {
		const decodedPayload = decodeJwtToken(refreshToken, process.env.REFRESH_SECRET);

		if (userWithToken.id !== decodedPayload.userId) {
			res.status(403);
			throw new Error("Access is forbidden!");
		}

		const newAccessToken = generateAccessToken(decodedPayload.userId);
		const newRefreshToken = generateRefreshToken(decodedPayload.userId, { expiresIn: "15m" });

		const updatedTokenArray = userWithToken.refreshTokenArray.map((token) => {
			const isTargetToken = crypto.timingSafeEqual(Buffer.from(token), Buffer.from(refreshToken));

			if (isTargetToken) {
				return newRefreshToken;
			}

			return token;
		});

		await UserModel.findByIdAndUpdate(userWithToken.id, { refreshTokenArray: updatedTokenArray });

		setCookieAndSendResponse({
			res,
			accessToken: newAccessToken,
			newRefreshToken,
		});

		// Catch error thrown when token is no longer valid so we remove the invalid refreshToken
	} catch (error) {
		const filteredTokenArray = userWithToken.refreshTokenArray.filter((token) => token !== refreshToken);

		await UserModel.findByIdAndUpdate(userWithToken.id, { refreshTokenArray: filteredTokenArray });

		res.status(401);
		throw new Error(error.message);
	}
});

export { refreshTokenHandler };
