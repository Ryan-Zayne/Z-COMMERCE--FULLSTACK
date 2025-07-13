import { UserModel } from "@/app/users/model";
import { ENVIRONMENT } from "@/config/env";
import { catchAsync } from "@/middleware";
import { AppError, AppResponse } from "@/utils";
import { decodeJwtToken } from "../services/common";

const verifyEmail = catchAsync<{ body: { token: string } }>(async (req, res) => {
	const { token } = req.body;

	if (!token) {
		throw new AppError(422, "Token is required");
	}

	const decodedEmailVerificationToken = decodeJwtToken(token, { secretKey: ENVIRONMENT.EMAIL_SECRET });

	if (!decodedEmailVerificationToken.id) {
		throw new AppError(400, "Invalid verification token");
	}

	const updatedUser = await UserModel.findByIdAndUpdate(
		decodedEmailVerificationToken.id,
		{ isEmailVerified: true },
		{ new: true }
	);

	if (!updatedUser) {
		throw new AppError(400, "Verification failed!");
	}

	return AppResponse(res, 200, "Account successfully verified!");
});

export { verifyEmail };
