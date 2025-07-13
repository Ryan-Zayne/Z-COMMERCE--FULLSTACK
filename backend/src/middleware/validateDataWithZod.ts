import { z } from "zod";
import { AppError } from "../utils";
import { SigninBodySchema, SignupBodySchema } from "../validation/formSchema";
import { catchAsync } from "./catchAsyncErrors";

const SCHEMA_LOOKUP = new Map<string, z.ZodType>([
	["/auth/signin", SigninBodySchema],
	["/auth/signup", SignupBodySchema],
]);

const methodsToSkip = new Set(["GET"]);

export const validateBodyWithZodGlobal = catchAsync((req, res, next) => {
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

export const validateBodyWithZod = (schema: z.ZodType) => {
	const handler = catchAsync((req, _res, next) => {
		const rawData = req.body;

		const result = schema.safeParse(rawData);

		if (!result.success) {
			const errorMessage = z.prettifyError(result.error);

			const errorObject = z.flattenError(result.error).fieldErrors;

			throw new AppError(422, errorMessage, { errors: errorObject });
		}

		req.body = result.data as Record<string, unknown>;

		next();
	});

	return handler;
};

export const readValidatedBody = <TSchema extends z.ZodType>(req: Request, schema: TSchema) => {
	const result = schema.safeParse(req.body);

	if (!result.success) {
		const errorMessage = z.prettifyError(result.error);

		const errorObject = z.flattenError(result.error).fieldErrors;

		throw new AppError(422, errorMessage, { errors: errorObject });
	}

	return result.data;
};
