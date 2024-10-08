import { authenticate, setCookie } from "@/common/utils";
import type { UserType } from "@/users/types";
import { catchAsync } from "./catchAsyncErrors";

const protect = catchAsync<{ user: UserType }>(async (req, res, next) => {
	// == Get the cookies from the request headers
	const { zayneAccessToken, zayneRefreshToken } = req.signedCookies;

	const { currentUser, newZayneAccessToken } = await authenticate({
		zayneAccessToken,
		zayneRefreshToken,
	});

	if (newZayneAccessToken !== null) {
		setCookie(res, "zayneAccessToken", newZayneAccessToken, {
			maxAge: 15 * 60 * 1000, // 15 minutes
		});
	}

	//  == Attach the user to the request object
	req.user = currentUser;

	next();
});

export { protect };
