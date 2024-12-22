import { catchAsync } from "@/common/middleware";
import { AppError, AppResponse, omitSensitiveFields } from "@/common/utils";
import type { HydratedUserType } from "@/users/types";

const session = catchAsync<{ user: HydratedUserType | undefined }>((req, res) => {
	const currentUser = req.user;

	if (!currentUser) {
		throw new AppError(401, "Unauthenticated");
	}

	return AppResponse(res, 200, "Authenticated", { user: omitSensitiveFields(currentUser) });
});

export { session };
