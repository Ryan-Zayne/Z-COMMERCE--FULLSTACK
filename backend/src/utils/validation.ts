import type { Request } from "express";
import { z } from "zod";
import { AppError } from "./AppError";

export const readValidatedBody = <TSchema extends z.ZodType<Record<string, unknown>>>(
	req: Request,
	schema: TSchema
) => {
	const result = schema.safeParse(req.body);

	if (!result.success) {
		const errorMessage = z.prettifyError(result.error);

		const errorObject = z.flattenError(result.error).fieldErrors;

		throw new AppError(422, errorMessage, { errors: errorObject });
	}

	return result.data;
};
