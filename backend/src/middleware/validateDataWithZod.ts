import type { ZodSchema } from "zod";
import { AppError } from "../utils";
import { LoginSchema, SignUpSchema } from "../validation/formSchema";
import { catchAsync } from "./catchAsyncErrors";

const SCHEMA_LOOKUP = new Map<string, ZodSchema>([
	["/auth/signin", LoginSchema],
	["/auth/signup", SignUpSchema],
]);

const methodsToSkip = new Set(["GET"]);

const validateDataWithZod = catchAsync<{ path: string }>((req, res, next) => {
	const apiVersionRegex = /v\d+/;

	// eslint-disable-next-line ts-eslint/no-non-null-assertion
	const mainPath = req.originalUrl.split(apiVersionRegex)[1]!;

	if (methodsToSkip.has(req.method) || !SCHEMA_LOOKUP.has(mainPath)) {
		next();
		return;
	}

	const rawData = req.body;

	if (!rawData) {
		next();
		return;
	}

	// eslint-disable-next-line ts-eslint/no-non-null-assertion
	const selectedSchema = SCHEMA_LOOKUP.get(mainPath)!;

	const result = selectedSchema.safeParse(rawData);

	if (!result.success) {
		const { fieldErrors, formErrors } = result.error.formErrors;

		const zodErrorDetails = { fieldErrors, formErrors };

		throw new AppError(422, "Validation Failed", { errors: zodErrorDetails });
	}

	req.body = result.data as Record<string, unknown>;

	next();
});

export { validateDataWithZod };
