import type { HydratedUserType } from "@/app/users/types";
import { catchAsync } from "@/middleware";
import { AppError, AppResponse, omitSensitiveFields } from "@/utils";

const session = catchAsync<{ user: HydratedUserType | undefined }>((req, res) => {
	const currentUser = req.user;

	if (!currentUser) {
		throw new AppError(401, "Unauthenticated");
	}

	return AppResponse(res, 200, "Authenticated", { user: omitSensitiveFields(currentUser) });
});

export { session };
