import { LoginSchema, SignUpSchema } from "../lib/schemas/formSchema.js";
import { asyncHandler } from "../lib/utils/asyncHandler.js";

const SCHEMA_LOOKUP = new Map()
	.set("/sign-up", SignUpSchema)
	.set("/login", LoginSchema)
	.set("default", () => {
		throw new Error("No schema found for this path!");
	});

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
