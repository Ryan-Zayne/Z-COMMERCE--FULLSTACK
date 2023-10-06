/**
 * @type {import('helmet').HelmetOptions}
 */

const helmetOptions = {
	contentSecurityPolicy: {
		useDefaults: true,

		directives: {
			scriptSrc: ["'self'", 'https://dummyjson.com'],
		},
	},
};

export { helmetOptions };
