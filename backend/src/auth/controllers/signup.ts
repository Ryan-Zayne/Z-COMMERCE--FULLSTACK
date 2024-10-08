import { catchAsync } from "@/common/middleware";
import { AppError } from "@/common/utils";
import { AppResponse } from "@/common/utils/appResponse";
import { UserModel } from "@/users/model";
import type { HydratedUserType } from "@/users/types";

const signUp = catchAsync<{
	validatedBody: Pick<HydratedUserType, "email" | "password" | "username">;
}>(async (req, res) => {
	const { email, password, username } = req.validatedBody;

	const existingUser = Boolean(await UserModel.exists({ email }));

	if (existingUser) {
		throw new AppError(400, "User with this email has already registered!");
	}

	const newUser = await UserModel.create({ email, password, username });

	return AppResponse(res, 201, "User created successfully", {
		status: "success",
		user: { email: newUser.email, name: newUser.username },
	});
});

export { signUp };
