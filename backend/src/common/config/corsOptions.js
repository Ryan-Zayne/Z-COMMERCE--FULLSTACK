/**
 * @type {import('cors').CorsOptions}
 */

const corsOptions = {
	origin: ['http://localhost:5173', 'https://zayne-commerce.onrender.com'],
	credentials: true,
	optionsSuccessStatus: 200,
};

export default corsOptions;
