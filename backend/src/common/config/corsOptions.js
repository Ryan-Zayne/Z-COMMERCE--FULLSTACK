/**
 * @type {import('cors').CorsOptions}
 */

const corsOptions = {
	origin: ["http://localhost:5173"],
	credentials: true,
	optionsSuccessStatus: 200,
};

export { corsOptions };
