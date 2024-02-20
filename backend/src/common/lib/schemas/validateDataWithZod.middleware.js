import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { LoginSchema, SignUpSchema } from "./formSchema.js";

const SCHEMA_LOOKUP = new Map([
	["/sign-up", SignUpSchema],
	["/login", LoginSchema],

	[
		"default",
		() => {
			throw new Error("No schema found for this path!");
		},
	],
]);

const validateDataWithZod = asyncHandler((req, res, next) => {
	if (!(req.method === "POST")) {
		next();
		return;
	}

	const rawData = req.body;

	const selectedSchema = SCHEMA_LOOKUP.get(req.path) ?? SCHEMA_LOOKUP.get("default")();

	const result = selectedSchema.safeParse(rawData);

	if (!result.success) {
		const zodErrors = Object.entries(result.error.flatten().fieldErrors);

		res.status(422).json({ status: "error", errors: zodErrors });
		return;
	}

	req.validatedBody = result.data;
	next();
});

export { validateDataWithZod };
