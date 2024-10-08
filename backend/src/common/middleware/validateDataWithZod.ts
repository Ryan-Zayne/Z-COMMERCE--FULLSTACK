import { AppError } from "../utils";
import { LoginSchema, SignUpSchema } from "../zod-schemas/formSchema";
import { catchAsync } from "./catchAsyncErrors";

const SCHEMA_LOOKUP = {
	"/sign-up": SignUpSchema,
	"/login": LoginSchema,
	default: () => {
		throw new Error("No schema found for this path!");
	},
};

const validateDataWithZod = catchAsync<{ validatedBody: unknown; path: string }>((req, res, next) => {
	if (req.method !== "POST") {
		next();
		return;
	}

	const rawData = req.body;

	if (!rawData) {
		next();
		return;
	}

	const selectedSchema = Object.hasOwn(SCHEMA_LOOKUP, req.path)
		? SCHEMA_LOOKUP[req.path as keyof typeof SCHEMA_LOOKUP]
		: SCHEMA_LOOKUP.default();

	const result = (selectedSchema as typeof SignUpSchema).safeParse(rawData);

	if (!result.success) {
		const zodErrors = Object.entries(result.error.flatten().fieldErrors);

		throw new AppError(422, "Validation Failed", zodErrors);
	}

	req.validatedBody = result.data;
	next();
});

export { validateDataWithZod };
