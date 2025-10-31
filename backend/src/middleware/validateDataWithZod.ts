import { SigninBodySchema, SignupBodySchema } from "@/app/auth/services/validation";
import { z } from "zod";
import { readValidatedBody } from "../utils";
import { catchAsync } from "./catchAsyncErrors";

const SCHEMA_LOOKUP = new Map<string, z.ZodType<Record<string, unknown>>>([
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

export const validateBodyWithZod = (schema: z.ZodType<Record<string, unknown>>) => {
	const handler = catchAsync((req, _res, next) => {
		const validatedBody = readValidatedBody(req, schema);

		req.body = validatedBody;

		next();
	});

	return handler;
};
