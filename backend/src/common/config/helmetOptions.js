/**
 * @type {import('helmet').HelmetOptions}
 */

const helmetOptions = {
	contentSecurityPolicy: {
		useDefaults: true,

		directives: {
			defaultSrc: "'self'",
			imgSrc: ["'self'", 'https://res.cloudinary.com', 'https://i.dummyjson.com', 'data:'],
			connectSrc: ["'self'", 'https://dummyjson.com'],
		},
	},
};

export { helmetOptions };
