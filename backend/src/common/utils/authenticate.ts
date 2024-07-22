import { AppError } from "./appError";

type RawCookies = {
	zayneAccessToken: string;
	zayneRefreshToken: string;
};

const authenticate = async ({ zayneAccessToken, zayneRefreshToken }: RawCookies) => {
	if (!zayneRefreshToken) {
		throw new AppError(401, "Unauthorized");
	}
};

export { authenticate };
