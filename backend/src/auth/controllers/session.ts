import { catchAsync } from "@/common/middleware";
import { AppError, omitSensitiveFields } from "@/common/utils";
import { AppResponse } from "@/common/utils/appResponse";
import type { UserType } from "@/users/types";
import type { HydratedDocument } from "mongoose";

const session = catchAsync<{ user: HydratedDocument<UserType> | undefined }>((req, res) => {
	const currentUser = req.user;

	if (!currentUser) {
		throw new AppError(401, "Unauthenticated");
	}

	return AppResponse(res, 200, "Authenticated", { user: omitSensitiveFields(currentUser) });
});

export { session };
