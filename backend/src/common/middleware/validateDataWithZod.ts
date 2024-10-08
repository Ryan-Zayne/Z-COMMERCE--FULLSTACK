import type { ZodSchema } from "zod";
import { AppError } from "../utils";
import { LoginSchema, SignUpSchema } from "../zod-schemas/formSchema";
import { catchAsync } from "./catchAsyncErrors";

const SCHEMA_LOOKUP = new Map<string, ZodSchema>([
	["/login", LoginSchema],
	["/sign-up", SignUpSchema],
]);

const validateDataWithZod = catchAsync<{ path: string; validatedBody: unknown }>((req, res, next) => {
	if (req.method !== "POST" || !SCHEMA_LOOKUP.has(req.path)) {
		next();
		return;
	}

	const rawData = req.body;

	if (!rawData) {
		next();
		return;
	}

	// eslint-disable-next-line ts-eslint/no-non-null-assertion
	const selectedSchema = SCHEMA_LOOKUP.get(req.path)!;

	const result = selectedSchema.safeParse(rawData);

	if (!result.success) {
		const zodErrors = Object.entries(result.error.flatten().fieldErrors);

		throw new AppError(422, "Validation Failed", { errors: zodErrors });
	}

	req.validatedBody = result.data;

	next();
});

export { validateDataWithZod };
