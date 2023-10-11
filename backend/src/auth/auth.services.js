import jwt from 'jsonwebtoken';

export const validateDataWithZod = (Schema) => (req, res, next) => {
	const rawData = req.body;
	const result = Schema.safeParse(rawData);

	if (!result.success) {
		const zodErrors = { errors: result.error.flatten().fieldErrors };
		res.status(422).json(zodErrors);
		return;
	}

	req.validatedBody = result.data;
	next();
};

export const generateAccessToken = (userId) => {
	const payLoad = { userId };

	const accessToken = jwt.sign(payLoad, process.env.ACCESS_SECRET, {
		expiresIn: '5m',
	});

	return accessToken;
};

export const generateRefreshToken = (userId) => {
	const payLoad = { userId };

	const refreshToken = jwt.sign(payLoad, process.env.REFRESH_SECRET, {
		expiresIn: '1d',
	});

	return refreshToken;
};
