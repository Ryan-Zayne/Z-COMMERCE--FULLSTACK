import jwt from 'jsonwebtoken';
import { isDevMode } from '../common/utils/constants.js';

export const generateAccessToken = (userId, { expiresIn = '5m' } = {}) => {
	const payLoad = { userId };

	const accessToken = jwt.sign(payLoad, process.env.ACCESS_SECRET, { expiresIn });

	return accessToken;
};

export const generateRefreshToken = (userId, { expiresIn = '1d' } = {}) => {
	const payLoad = { userId };

	const refreshToken = jwt.sign(payLoad, process.env.REFRESH_SECRET, { expiresIn });

	return refreshToken;
};

export const decodeJwtToken = (token, secretKey) => {
	const decodedPayload = jwt.verify(token, secretKey);

	return decodedPayload;
};

export const clearExistingCookie = (res) => {
	res.clearCookie('refreshToken', {
		sameSite: 'strict',
		secure: !isDevMode,
		httpOnly: true,
		signed: true,
	});
};
