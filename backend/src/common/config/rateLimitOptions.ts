const rateLimitOptions = {
	windowMs: 15 * 60 * 1000,
	max: 100, // Limit each IP to 100 requests per windowMs
	message: "Too many requests from this IP, please try again later.",
};

export { rateLimitOptions };
