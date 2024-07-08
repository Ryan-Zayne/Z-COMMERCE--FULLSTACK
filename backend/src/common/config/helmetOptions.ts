import type { HelmetOptions } from "helmet";

const helmetOptions = {
	// X-Frame-Options header to prevent clickjacking
	frameguard: { action: "deny" },
	// X-XSS-Protection header to enable browser's built-in XSS protection
	xssFilter: true,
	// Referrer-Policy header
	referrerPolicy: { policy: "same-origin" },

	contentSecurityPolicy: {
		useDefaults: true,

		directives: {
			defaultSrc: "'self'",
			imgSrc: ["'self'", "https://res.cloudinary.com", "https://i.dummyjson.com", "data:"],
			connectSrc: ["'self'", "https://dummyjson.com"],
		},
	},
} satisfies HelmetOptions;

export { helmetOptions };
