import { catchAsync } from "@/common/middleware";
import { AppError, removeCookie } from "@/common/utils";
import { AppResponse } from "@/common/utils/appResponse";
import { UserModel } from "@/users/model";
import type { UserType } from "@/users/types";
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
