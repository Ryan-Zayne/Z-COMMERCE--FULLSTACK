import jwt from 'jsonwebtoken';
import asyncHandler from '../common/utils/asyncHandler.utils.js';
import UserModel from '../users/user.model.js';
import { generateAccessToken, generateRefreshToken } from './auth.services.js';

// @desc Register a User
// @route POST /api/auth/sign-up
// @access Public
export const signUpUser = asyncHandler(async (req, res) => {
	const { username, email, password } = req.validatedBody;

	const existingUser = await UserModel.findOne({ email });

	if (existingUser) {
		res.status(400);
		throw new Error('User with this email has already registered!');
	}

	const newUser = await UserModel.create({ username, email, password });

	res.status(201).json({ userName: newUser.username, email: newUser.email });
});

// @desc Login User
// @route POST /api/auth/login
// @access Public
export const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.validatedBody;

	const foundUser = await UserModel.findOne({ email });
	const isValidPassword = Boolean(await foundUser?.comparePassword(password));

	if (!isValidPassword) {
		res.status(401);
		throw new Error('Invalid email or password!');
	}

	const accessToken = generateAccessToken(foundUser.id);
	const refreshToken = generateRefreshToken(foundUser.id);

	await UserModel.findByIdAndUpdate(foundUser.id, { refreshToken });

	res.cookie('refreshToken', refreshToken, {
		sameSite: 'strict',
		secure: true,
		httpOnly: true,
		maxAge: 24 * 60 * 60 * 1000,
	});

	res.json({ accessToken });
});

// @desc Refresh access token
// @route GET /api/auth/refresh
// @access Public
export const handleTokenRefresh = asyncHandler(async (req, res) => {
	const { refreshToken } = req.cookies ?? {};

	if (!refreshToken) {
		res.status(401);
		throw new Error('Cookie or Refresh token not found');
	}

	const foundUser = await UserModel.findOne({ refreshToken });

	if (!foundUser) {
		res.status(403);
		throw new Error('User is not authorized!');
	}

	try {
		const decodedPayload = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

		if (foundUser.id !== decodedPayload.userId) {
			res.status(403);
			throw new Error('User is not authorized!');
		}

		const accessToken = generateAccessToken(decodedPayload.userId);

		res.json({ accessToken });
		// Catch error thrown by jwt.verify
	} catch {
		res.status(403);
		throw new Error('User is not authorized!');
	}
});

// @desc Logout User
// @route GET /api/auth/logout
// @access Private
export const logoutUser = asyncHandler(async (req, res) => {
	const { refreshToken } = req.cookies ?? {};

	if (!refreshToken) {
		res.sendStatus(204);
		return;
	}

	const foundUser = await UserModel.findOne({ refreshToken });

	if (!foundUser) {
		res.clearCookie('refreshToken', {
			sameSite: 'strict',
			secure: true,
			httpOnly: true,
		});

		res.sendStatus(204);
		return;
	}

	await UserModel.findByIdAndUpdate(foundUser.id, { refreshToken: '' });

	res.clearCookie('refreshToken', {
		sameSite: 'strict',
		secure: true,
		httpOnly: true,
	});

	res.sendStatus(204);
});
