import { UserModel } from "@/app/users/model";
import type { UserType } from "@/app/users/types";
import { ENVIRONMENT } from "@/config/env";
import { setCookie } from "@/utils";
import type { HydratedDocument } from "mongoose";
import { catchAsync } from "../catchAsyncErrors";
import { authenticateUser } from "./authenticateUser";

const protect = catchAsync<{ user: HydratedDocument<UserType> }>(async (req, res, next) => {
	// == Get the cookies from the request headers
	const { zayneAccessToken, zayneRefreshToken } = req.signedCookies;

	const { currentUser, newZayneAccessToken, newZayneRefreshToken } = await authenticateUser({
		zayneAccessToken,
		zayneRefreshToken,
	});

	//  == Attach the user to the request object and return if no new tokens are generated
	if (!newZayneAccessToken || !newZayneRefreshToken) {
		req.user = currentUser;
		next();

		return;
	}

	setCookie(res, "zayneAccessToken", newZayneAccessToken, {
		maxAge: ENVIRONMENT.ACCESS_JWT_EXPIRES_IN,
	});

	setCookie(res, "zayneRefreshToken", newZayneRefreshToken, {
		maxAge: ENVIRONMENT.REFRESH_JWT_EXPIRES_IN,
	});

	// == If the refresh token is not present in the array, clear the user's refresh token array by returning an empty array (To prevent token reuse)
	// == Else, remove the old refresh token from the array
	const existingRefreshTokenArray = !currentUser.refreshTokenArray.includes(newZayneRefreshToken)
		? []
		: currentUser.refreshTokenArray.filter((token) => token !== newZayneRefreshToken);

	// == Update user loginRetries to 0 and lastLogin to current time
	const updatedUser = await UserModel.findByIdAndUpdate(
		currentUser.id,
		{ newZayneRefreshToken, refreshTokenArray: [...existingRefreshTokenArray, newZayneRefreshToken] },
		{ new: true }
	);

	// == Attach the updated user to the request object
	req.user = updatedUser as typeof currentUser;

	next();
});

export { protect };
