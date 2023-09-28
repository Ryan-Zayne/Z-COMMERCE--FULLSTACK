const allowedOrigins = new Set(['http://localhost:5173', 'https://zayne-commerce.onrender.com']);

/**
 * @type {import('cors').CorsOptions}
 */

const corsOptions = {
	origin: (origin, callbackFn) => {
		if (allowedOrigins.has(origin) || !origin) {
			callbackFn(null, true);
		} else {
			callbackFn(new Error('Access origin Not allowed by CORS'));
		}
	},

	credentials: true,
	optionsSuccessStatus: 200,
};

export default corsOptions;
