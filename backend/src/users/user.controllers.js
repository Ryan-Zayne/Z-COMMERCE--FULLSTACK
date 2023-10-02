import asyncHandler from '../global/utils/asyncHandler.utils.js';
import User from './user.model.js';

// @desc Update current User Profile
// @route PATCH /api/users/update-profile
// @access private
export const updateUserProfile = asyncHandler(async (req, res) => {
	const userId = req.user.id;
	const foundUser = await User.findById(userId);

	if (!foundUser) {
		res.status(404);
		throw new Error('User not found');
	}

	const {
		username = foundUser.username,
		email = foundUser.email,
		password = foundUser.password,
	} = req.body;

	const updatedUser = await User.findByIdAndUpdate(userId, { username, email, password }, { new: true });

	res.json({ username: updatedUser.username, email: updatedUser.email });
});
