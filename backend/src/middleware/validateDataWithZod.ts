import type { ZodSchema } from "zod";
import { AppError } from "../utils";
import { PaymentBodySchema, SigninBodySchema, SignupBodySchema } from "../validation/formSchema";
import { catchAsync } from "./catchAsyncErrors";

const SCHEMA_LOOKUP = new Map<string, ZodSchema>([
	["/auth/signin", SigninBodySchema],
	["/auth/signup", SignupBodySchema],
	["/payment/initialize", PaymentBodySchema],
]);

const methodsToSkip = new Set(["GET"]);

export const validateBodyWithZodGlobal = catchAsync<{ path: string }>((req, res, next) => {
	const baseURLWithoutApiVersion = `/${req.baseUrl.split("/").at(-1)}`;

	const mainPath = `${baseURLWithoutApiVersion}${req.path}`;

	if (methodsToSkip.has(req.method) || !SCHEMA_LOOKUP.has(mainPath)) {
		next();
		return;
	}

	// eslint-disable-next-line ts-eslint/no-non-null-assertion
	const selectedSchema = SCHEMA_LOOKUP.get(mainPath)!;

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
