/**
 * @type {import('cors').CorsOptions}
 */

const corsOptions = {
	origin: [
		'http://localhost:5173',
		'https://zayne-commerce.onrender.com',
		'https://zayne-commerce.vercel.app',
	],
	credentials: true,
	optionsSuccessStatus: 200,
};

export { corsOptions };
