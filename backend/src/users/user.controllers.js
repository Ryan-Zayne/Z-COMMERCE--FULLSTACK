import { asyncHandler } from '../common/utils/asyncHandler.utils.js';
import UserModel from './user.model.js';

// @desc Update current User Profile
// @route PATCH /api/users/update-profile
// @access private
export const updateUserProfile = asyncHandler(async (req, res) => {
	const userId = req.user.id;
	const user = await UserModel.findById(userId).select('+password');

	if (!user) {
		res.status(404);
		throw new Error('User not found');
	}

	const { username = user.username, email = user.email, password = user.password } = req.body;

	const updatedUser = await UserModel.findByIdAndUpdate(
		userId,
		{ username, email, password },
		{ new: true }
	);

	res.json({ username: updatedUser.username, email: updatedUser.email });
});
