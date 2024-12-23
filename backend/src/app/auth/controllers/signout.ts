import { UserModel } from "@/app/users/model";
import type { UserType } from "@/app/users/types";
import { catchAsync } from "@/middleware";
import { AppError, AppResponse, removeCookie } from "@/utils";
import type { HydratedDocument } from "mongoose";

// @route GET /api/auth/logout
// @access Private
const signOut = catchAsync<{ user: HydratedDocument<UserType> | undefined }>(async (req, res) => {
	const { user } = req;
	const { zayneRefreshToken } = req.signedCookies;

	if (!user) {
		throw new AppError(404, "You are not logged in");
	}

	const updatedTokenArray = user.refreshTokenArray.filter((token) => token !== zayneRefreshToken);

	await UserModel.findByIdAndUpdate(user.id, { refreshTokenArray: updatedTokenArray });

	removeCookie(res, "zayneAccessToken");
	removeCookie(res, "zayneRefreshToken");

	return AppResponse(res, 200, "Logout successful");
});

export { signOut };
