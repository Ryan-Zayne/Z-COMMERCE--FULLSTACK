import asyncHandler from '../global/utils/asyncHandler.utils.js';
import User from '../users/user.model.js';
import { generateToken } from './auth.helpers.js';

// @desc Register a User
// @route POST /api/auth/sign-up
// @access Public
export const signUpUser = asyncHandler(async (req, res) => {
	const { username, email, password } = req.validatedBody;

	const existingUser = await User.findOne({ email });

	if (existingUser) {
		res.status(400);
		throw new Error('User with this email has already registered!');
	}

	const newUser = await User.create({ username, email, password });

	res.status(201).json({ userName: newUser.username, email: newUser.email });
});

// @desc Login User
// @route POST /api/auth/login
// @access Public
export const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.validatedBody;

	const foundUser = await User.findOne({ email });
	const isValidPassword = await foundUser.comparePassword(password);

	if (!isValidPassword) {
		res.status(401);
		throw new Error('Invalid email or password!');
	}

	const encodedToken = generateToken(foundUser.id);

	res.json({ encodedToken });
});
