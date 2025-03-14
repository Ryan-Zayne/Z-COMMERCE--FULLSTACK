import type { CorsOptions } from "cors";

const corsOptions = {
	credentials: true,
	optionsSuccessStatus: 200,
	origin: [
		"http://localhost:5173",
		"https://zayne-commerce.vercel.app",
		"https://www.zayne-commerce.vercel.app",
	],
} satisfies CorsOptions;

export { corsOptions };
