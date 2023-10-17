import { decodeJwtToken } from '../../auth/auth.services.js';
import UserModel from '../../users/user.model.js';
import { asyncHandler } from '../utils/asyncHandler.utils.js';

const authenticateUser = asyncHandler(async (req, res, next) => {
	const authHeader = req.headers.authorization ?? req.headers.Authorization;
	const isValidAuthHeader = Boolean(authHeader?.startsWith('Bearer'));

	if (!isValidAuthHeader) {
		res.status(401);
		throw new Error('Please ensure to set the authorization header!');
	}

	const { 1: accessToken } = authHeader.split(' ');

	if (!accessToken) {
		res.status(401);
		throw new Error('User is not authorized or token is missing');
	}

	try {
		const decodedPayload = decodeJwtToken(accessToken, process.env.ACCESS_SECRET);

		const authenticatedUser = await UserModel.findById(decodedPayload.userId).select('-password');

		req.user = authenticatedUser;
		next();
		// Catch error thrown by jwt.verify when token is not valid
	} catch {
		res.status(401);
		throw new Error('Expired token!');
	}
});

export default authenticateUser;
