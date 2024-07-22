import type { Options } from "express-rate-limit";

const rateLimitOptions = {
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per windowMs
	message: "Too many requests from this IP, please try again later.",
	standardHeaders: true,
} satisfies Partial<Options>;

export { rateLimitOptions };
