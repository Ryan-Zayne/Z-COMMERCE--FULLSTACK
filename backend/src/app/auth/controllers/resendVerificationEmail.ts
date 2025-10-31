import { UserModel } from "@/app/auth/model";
import type { HydratedUserType } from "@/app/auth/types";
import { catchAsync } from "@/middleware";
import { AppError, AppResponse, readValidatedBody } from "@/utils";
import { ResendVerificationEmailSchema, sendVerificationEmail } from "../services";

const resendVerificationEmail = catchAsync(async (req, res) => {
	const { email } = readValidatedBody(req, ResendVerificationEmailSchema);

	const user = await UserModel.findOne({ email });

	if (!user) {
		throw new AppError(400, "No user found with provided email");
	}

	if (user.isEmailVerified) {
		throw new AppError(400, "Email already verified");
	}

	await sendVerificationEmail(user as HydratedUserType);

	return AppResponse(res, 200, `Verification link sent to ${email}`);
});

export { resendVerificationEmail };
