import { decodeJwtToken } from "@/auth/services";
// import { clearExistingCookie, decodeJwtToken } from "@/auth/services";
import { ENVIRONMENT } from "@/common/zod-schemas/envSchema";
import { UserModel } from "@/users/model";
import { catchAsync } from "./catchAsyncErrors";

export const preventTokenReuse = catchAsync<{ user: unknown }>(async (req, res, next) => {
	const { refreshToken } = req.signedCookies;

	if (!refreshToken) {
		res.status(401);
		throw new Error("Cookie is missing!");
	}

	// LINK - How this works: https://www.mongodb.com/docs/manual/tutorial/query-arrays/#query-an-array-for-an-element
	const userWithToken = await UserModel.findOne({ refreshTokenArray: refreshToken }).select(
		"+refreshTokenArray"
	);

	if (!userWithToken) {
		// UserWithToken not found, Refresh token reuse detected!
		try {
			const decodedPayload = decodeJwtToken(refreshToken, ENVIRONMENT.REFRESH_SECRET);

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
			// clearExistingCookie(res);
		}
	}

	// Else, refresh token reuse is not detected, proceed to next middleware
	req.user = { userWithToken };
	next();
});
