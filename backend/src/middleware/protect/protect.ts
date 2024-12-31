import type { UserType } from "@/app/users/types";
import { ENVIRONMENT } from "@/config/env";
import { setCookie } from "@/utils";
import type { HydratedDocument } from "mongoose";
import { catchAsync } from "../catchAsyncErrors";
import { authenticateUser } from "./authenticateUser";

const protect = catchAsync<{ user: HydratedDocument<UserType> }>(async (req, res, next) => {
	// == Get the cookies from the request headers
	const { zayneAccessToken, zayneRefreshToken } = req.signedCookies;

	const { currentUser, newZayneAccessToken } = await authenticateUser({
		zayneAccessToken,
		zayneRefreshToken,
	});

	if (newZayneAccessToken) {
		setCookie(res, "zayneAccessToken", newZayneAccessToken, {
			maxAge: ENVIRONMENT.ACCESS_JWT_EXPIRES_IN,
		});
	}

	//  == Attach the user to the request object
	req.user = currentUser;

	next();
});

export { protect };
