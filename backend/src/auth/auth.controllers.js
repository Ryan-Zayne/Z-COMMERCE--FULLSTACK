import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import asyncHandler from '../global/utils/asyncHandler.utils.js';
import User from '../users/user.model.js';

// @desc Register a User
// @route POST /auth/sign-up
// @access Public
export const signUpUser = asyncHandler(async (req, res) => {
	const { username, email, password } = req.validatedBody;

	const userExists = await User.findOne({ email });
	if (userExists) {
		res.status(400);
		throw new Error('User with this email has already registered!');
	}

	const saltRounds = 15;
	const hashedPassword = await bcrypt.hash(password, saltRounds);

	const newUser = await User.create({
		username,
		email,
		password: hashedPassword,
	});

	res.status(201).json({
		id: newUser.id,
		userName: newUser.username,
	});
});

// @desc Login User
// @route POST /auth/login
// @access Public
export const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.validatedBody;

	const user = await User.findOne({ email });
	const isValidPassword = Boolean(user && (await bcrypt.compare(password, user.password)));

	if (!isValidPassword) {
		res.status(401);
		throw new Error('Invalid email or password!');
	}

	const payLoad = {
		user: {
			username: user.username,
			email: user.email,
			id: user.id,
		},
	};

	const encodedToken = jwt.sign(payLoad, process.env.JWT_SECRET, {
		expiresIn: '20d',
	});

	res.json({ encodedToken });
});
