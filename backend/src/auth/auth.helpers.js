/* eslint-disable consistent-return */
// eslint-disable-next-line import/no-relative-packages

export const validateDataWithZod = (Schema) => (req, res, next) => {
	const rawData = req.body;
	const result = Schema.safeParse(rawData);

	if (!result.success) {
		const zodErrors = { errors: result.error.flatten().fieldErrors };
		return res.status(422).json(zodErrors);
	}

	req.validatedBody = result.data;
	next();
};
