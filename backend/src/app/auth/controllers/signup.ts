import { UserModel } from "@/app/users/model";
import type { HydratedUserType } from "@/app/users/types";
import { catchAsync } from "@/middleware";
import { AppError, AppResponse, omitSensitiveFields } from "@/utils";
import { sendVerificationEmail } from "../services";

const signUp = catchAsync<{
	body: Pick<HydratedUserType, "email" | "password" | "username">;
}>(async (req, res) => {
	const { email, password, username } = req.body;

	const existingUser = Boolean(await UserModel.exists({ email }));

	if (existingUser) {
		throw new AppError(400, "User with this email already exists!");
	}

	const newUser = await UserModel.create({ email, password, username });

	void sendVerificationEmail(newUser as HydratedUserType, req);

	return AppResponse(res, 201, "Account created successfully", {
		data: {
			user: omitSensitiveFields(newUser),
		},
	});
});

export { signUp };
