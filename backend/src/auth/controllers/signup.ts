import { AppError, catchAsync } from "@/common/utils";
import { UserModel } from "@/users/model";
import type { HydratedUserType } from "@/users/types";

// @route POST /api/auth/sign-up
// @access Public
const signUpUser = catchAsync<{
	validatedBody: Pick<HydratedUserType, "username" | "email" | "password">;
}>(async (req, res) => {
	const { username, email, password } = req.validatedBody;

	const existingUser = Boolean(await UserModel.exists({ email }));

	if (existingUser) {
		throw new AppError(400, "User with this email has already registered!");
	}

	const newUser = await UserModel.create({ username, email, password });

	res.status(201).json({ status: "success", user: { name: newUser.username, email: newUser.email } });
});

export { signUpUser };
