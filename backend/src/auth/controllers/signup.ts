import { catchAsync } from "@/common/middleware";
import { AppError, omitSensitiveFields } from "@/common/utils";
import { AppResponse } from "@/common/utils/appResponse";
import { UserModel } from "@/users/model";
import type { HydratedUserType } from "@/users/types";

const signUp = catchAsync<{
	validatedBody: Pick<HydratedUserType, "email" | "password" | "username">;
}>(async (req, res) => {
	const { email, password, username } = req.validatedBody;

	if (!email || !password) {
		throw new AppError(400, "Incomplete signup data");
	}

	const existingUser = Boolean(await UserModel.exists({ email }));

	if (existingUser) {
		throw new AppError(400, "User with this email already exists!");
	}

	const newUser = await UserModel.create({ email, password, username });

	return AppResponse(res, 201, "Account created successfully", {
		status: "success",
		user: omitSensitiveFields(newUser),
	});
});

export { signUp };
