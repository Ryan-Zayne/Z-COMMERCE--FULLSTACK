import { isDevMode } from "@/common/lib/constants";
import jwt from "jsonwebtoken";

export const generateAccessToken = (userId, { expiresIn = "5m" } = {}) => {
	const payLoad = { userId };

	const accessToken = jwt.sign(payLoad, process.env.ACCESS_SECRET, { expiresIn });

	return accessToken;
};

export const generateRefreshToken = (userId, { expiresIn = "1d" } = {}) => {
	const payLoad = { userId };

	const refreshToken = jwt.sign(payLoad, process.env.REFRESH_SECRET, { expiresIn });

	return refreshToken;
};

export const decodeJwtToken = (token, secretKey) => {
	const decodedPayload = jwt.verify(token, secretKey);

	return decodedPayload;
};

export const setCookieAndSendResponse = ({ res, user, accessToken, newRefreshToken }) => {
	res.cookie("refreshToken", newRefreshToken, {
		sameSite: "strict",
		secure: !isDevMode,
		httpOnly: true,
		signed: true,
		maxAge: 24 * 60 * 60 * 1000,
	});

	// eslint-disable-next-line no-unused-expressions
	!user
		? res.json({ status: "success", accessToken })
		: res.json({ status: "success", accessToken, user: { name: user.username, email: user.email } });
};

export const clearExistingCookie = (res) => {
	res.clearCookie("refreshToken", {
		sameSite: "strict",
		secure: !isDevMode,
		httpOnly: true,
		signed: true,
	});
};
