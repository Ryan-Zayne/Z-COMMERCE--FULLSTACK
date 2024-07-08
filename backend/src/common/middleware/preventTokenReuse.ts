import { clearExistingCookie, decodeJwtToken } from "@/auth/services";
import UserModel from "@/users/model";
import { asyncHandler } from "../lib/utils/asyncHandler";

export const preventTokenReuse = asyncHandler(async (req, res, next) => {
	const { refreshToken } = req.signedCookies;

	if (!refreshToken) {
		res.status(401);
		throw new Error("Cookie is missing!");
	}

	const userWithToken = await UserModel.findOne({ refreshTokenArray: refreshToken }).select(
		"+refreshTokenArray"
	);

	if (!userWithToken) {
		// UserWithToken not found, Refresh token reuse detected!
		try {
			const decodedPayload = decodeJwtToken(refreshToken, process.env.REFRESH_SECRET);

			await UserModel.findByIdAndUpdate(decodedPayload.userId, { refreshTokenArray: [] });

			res.status(403);
			throw new Error("Access is forbidden!");

			// Simply throw an error since token is already expired at this point
		} catch (error) {
			res.status(403);

			if (error.name === "TokenExpiredError") {
				throw new Error(`Forbidden Access and ${error.message}`);
			}

			throw new Error(error.message);

			// Clear existing refreshToken cookie either way
		} finally {
			clearExistingCookie(res);
		}
	}

	// Else, refresh token reuse is not detected, proceed to next middleware
	req.user = { userWithToken };
	next();
});
