import type { ZodSchema } from "zod";
import { LoginSchema, SignUpSchema } from "../schemas/formSchema";
import { AppError } from "../utils";
import { catchAsync } from "./catchAsyncErrors";

const SCHEMA_LOOKUP = new Map<string, ZodSchema>([
	["/auth/signin", LoginSchema],
	["/auth/signup", SignUpSchema],
]);

const methodsToSkipValidation = new Set(["GET"]);

const validateDataWithZod = catchAsync<{ path: string }>((req, res, next) => {
	// eslint-disable-next-line ts-eslint/no-non-null-assertion
	const mainPath = req.path.split("v1")[1]!;

	if (methodsToSkipValidation.has(req.method) || !SCHEMA_LOOKUP.has(mainPath)) {
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
		const zodErrorDetails = {
			...result.error.formErrors,
			fieldErrors: Object.entries(result.error.formErrors.fieldErrors),
		};

		throw new AppError(422, "Validation Failed", { errors: zodErrorDetails });
	}

	req.body = result.data as Record<string, unknown>;

	next();
});

export { validateDataWithZod };
