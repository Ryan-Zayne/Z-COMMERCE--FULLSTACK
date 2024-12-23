import type { UserType } from "@/app/users/types";
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
			maxAge: 15 * 60 * 1000, // 15 minutes
		});
	}

	//  == Attach the user to the request object
	req.user = currentUser;

	next();
});

export { protect };
