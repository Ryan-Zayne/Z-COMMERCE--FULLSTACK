import { asyncHandler } from '../../common/utils/asyncHandler.utils.js';
import UserModel from '../../users/user.model.js';

// @desc Sign up a User
// @route POST /api/auth/sign-up
// @access Public
const signUpUser = asyncHandler(async (req, res) => {
	const { username, email, password } = req.validatedBody;

	const existingUser = Boolean(await UserModel.exists({ email }));

	if (existingUser) {
		res.status(400);
		throw new Error('User with this email has already registered!');
	}

	const newUser = await UserModel.create({ username, email, password });

	res.status(201).json({ status: 'success', user: { name: newUser.username, email: newUser.email } });
});

export { signUpUser };
