import { decodeJwtToken } from "@/auth/services";
import UserModel from "@/users/model";
import { asyncHandler } from "../lib/utils/asyncHandler";

const verifyUser = asyncHandler(async (req, res, next) => {
	const authHeader = req.headers.authorization ?? req.headers.Authorization;
	const isValidAuthHeader = Boolean(authHeader?.startsWith("Bearer"));

	if (!isValidAuthHeader) {
		res.status(401);
		throw new Error("Please ensure to set the authorization header!");
	}

	const { 1: accessToken } = authHeader.split(" ");

	if (!accessToken) {
		res.status(401);
		throw new Error("User is not authorized or token is missing!");
	}

	try {
		const decodedPayload = decodeJwtToken(accessToken, process.env.ACCESS_SECRET);

		const authenticatedUser = await UserModel.findById(decodedPayload.userId);

		req.user = { authenticatedUser };
		next();

		// Catch error thrown by decodeJwtToken when token is not valid
	} catch {
		res.status(401);
		throw new Error("Your token has expired!");
	}
});

export { verifyUser };
