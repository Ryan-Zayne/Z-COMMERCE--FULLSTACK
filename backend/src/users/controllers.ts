import { asyncHandler } from "@/common/lib/utils";
import UserModel from "./model";

// @route PATCH /api/users/update-profile
// @access private
export const updateUserProfile = asyncHandler(async (req, res) => {
	const userId = req.user.id;
	const user = await UserModel.findById(userId).select("+password");

	if (!user) {
		res.status(404);
		throw new Error("User not found");
	}

	const { username = user.username, email = user.email, password = user.password } = req.body;

	const updatedUser = await UserModel.findByIdAndUpdate(
		userId,
		{ username, email, password },
		{ new: true }
	);

	res.json({ status: "success", username: updatedUser.username, email: updatedUser.email });
});
