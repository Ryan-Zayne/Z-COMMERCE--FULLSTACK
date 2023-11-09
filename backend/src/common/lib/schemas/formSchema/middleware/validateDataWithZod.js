const validateDataWithZod = (Schema) => (req, res, next) => {
	const rawData = req.body;
	const result = Schema.safeParse(rawData);

	if (!result.success) {
		const zodErrors = { errors: Object.entries(result.error.flatten().fieldErrors) };

		res.status(422).json(zodErrors);
		return;
	}

	req.validatedBody = result.data;
	next();
};

export { validateDataWithZod };
