import { UserModel } from "@/app/users/model";
import type { UserType } from "@/app/users/types";
import { catchAsync } from "@/middleware";
import { AppResponse, removeCookie } from "@/utils";
import type { HydratedDocument } from "mongoose";

// @route GET /api/auth/signout
// @access Private
const signOut = catchAsync<{ user: HydratedDocument<UserType> }>(async (req, res) => {
	const currentUser = req.user;
	const { zayneRefreshToken } = req.signedCookies;

	const updatedTokenArray = currentUser.refreshTokenArray.filter((token) => token !== zayneRefreshToken);

	await UserModel.findByIdAndUpdate(currentUser.id, { refreshTokenArray: updatedTokenArray });

	removeCookie(res, "zayneAccessToken");
	removeCookie(res, "zayneRefreshToken");

	return AppResponse(res, 200, "Logout successful");
});

export { signOut };
