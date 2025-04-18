import type { ZodSchema } from "zod";
import { AppError } from "../utils";
import { SigninBodySchema, SignupBodySchema } from "../validation/formSchema";
import { catchAsync } from "./catchAsyncErrors";

const SCHEMA_LOOKUP = new Map<string, ZodSchema>([
	["/auth/signin", SigninBodySchema],
	["/auth/signup", SignupBodySchema],
]);

const methodsToSkip = new Set(["GET"]);

export const validateBodyWithZodGlobal = catchAsync<{ path: string }>((req, res, next) => {
	if (methodsToSkip.has(req.method)) {
		next();
		return;
	}

	const selectedSchema = SCHEMA_LOOKUP.entries().find(([key]) => req.originalUrl.endsWith(key))?.[1];

	if (!selectedSchema) {
		next();
		return;
	}

	void validateBodyWithZod(selectedSchema)(req, res, next);
});

export const validateBodyWithZod = (schema: ZodSchema) => {
	const handler = catchAsync((req, _res, next) => {
		const rawData = req.body;

		const result = schema.safeParse(rawData);

		if (!result.success) {
			const { fieldErrors, formErrors } = result.error.flatten();

			const zodErrorDetails = { fieldErrors, rootErrors: formErrors };

			throw new AppError(422, "Validation Failed", { errors: zodErrorDetails });
		}

		req.body = result.data as Record<string, unknown>;

		next();
	});

	return handler;
};
