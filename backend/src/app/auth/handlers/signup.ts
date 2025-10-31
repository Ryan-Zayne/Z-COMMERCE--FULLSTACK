import { UserModel } from "@/app/auth/model";
import type { HydratedUserType } from "@/app/auth/types";
import { ENVIRONMENT } from "@/config/env";
import { catchAsync } from "@/middleware";
import { AppError, AppResponse, omitSensitiveFields, setCookie } from "@/utils";
import { sendVerificationEmail } from "../services/common";
import type { SignupBodySchemaType } from "../services/validation";

const signUp = catchAsync<{
	body: SignupBodySchemaType;
}>(async (req, res) => {
	const { email, password, username } = req.body;

	const existingUser = Boolean(await UserModel.exists({ email }));

	if (existingUser) {
		throw new AppError(400, "User with this email already exists!");
	}

	const newUser = await UserModel.create({ email, password, username });

	const newZayneAccessToken = newUser.generateAccessToken();

	const newZayneRefreshToken = newUser.generateRefreshToken();

	setCookie(res, "zayneAccessToken", newZayneAccessToken, {
		maxAge: ENVIRONMENT.ACCESS_JWT_EXPIRES_IN,
	});

	setCookie(res, "zayneRefreshToken", newZayneRefreshToken, {
		maxAge: ENVIRONMENT.REFRESH_JWT_EXPIRES_IN,
	});

	void sendVerificationEmail(newUser as HydratedUserType);

	return AppResponse(res, 201, "Account created successfully", {
		user: omitSensitiveFields(newUser, ["isDeleted"], { replaceId: true }),
	});
});

export { signUp };
