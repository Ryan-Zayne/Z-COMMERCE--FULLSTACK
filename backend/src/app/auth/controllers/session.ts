import type { HydratedUserType } from "@/app/users/types";
import { catchAsync } from "@/middleware";
import { AppResponse, omitSensitiveFields } from "@/utils";

const session = catchAsync<{ user: HydratedUserType }>((req, res) => {
	const currentUser = req.user;

	return AppResponse(res, 200, "Authenticated", { user: omitSensitiveFields(currentUser) });
});

export { session };
