import { UserModel } from "@/app/users/model";
import type { HydratedUserType } from "@/app/users/types";
import { catchAsync } from "@/middleware";
import { AppError, AppResponse } from "@/utils";
import { sendVerificationEmail } from "../services";

const resendVerificationEmail = catchAsync<{ body: { email: string | undefined } }>(async (req, res) => {
	const { email } = req.body;

	if (!email) {
		throw new AppError(422, "Email is required");
	}

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
