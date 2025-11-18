import { UserModel } from "@/app/auth/model";
import { getUpdatedTokenArray } from "@/app/auth/services/common";
import type { UserType } from "@/app/auth/types";
import { ENVIRONMENT } from "@/config/env";
import { setCookie } from "@/utils";
import type { HydratedDocument } from "mongoose";
import { catchAsync } from "../catchAsyncErrors";
import { validateUserSession } from "./validateUserSession";

// Create a new service in auth/services.ts

const protect = catchAsync<{ user: HydratedDocument<UserType> }>(async (req, res, next) => {
	// == Get the cookies from the request headers
	const { zayneAccessToken, zayneRefreshToken } = req.signedCookies;

	const { currentUser, newZayneAccessToken, newZayneRefreshToken } = await validateUserSession({
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

	const updatedTokenArray = getUpdatedTokenArray(currentUser, zayneRefreshToken);

	const updatedUser = await UserModel.findByIdAndUpdate(
		currentUser.id,
		{ refreshTokenArray: [...updatedTokenArray, newZayneRefreshToken] },
		{ new: true }
	);

	// == Attach the updated user to the request object
	req.user = updatedUser as typeof currentUser;

	next();
});

export { protect };
