/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';

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

export const generateToken = (userId) => {
	const payLoad = { userId };

	const encodedToken = jwt.sign(payLoad, process.env.JWT_SECRET, {
		expiresIn: '20d',
	});

	return encodedToken;
};
