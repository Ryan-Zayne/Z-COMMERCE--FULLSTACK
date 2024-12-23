import type { CorsOptions } from "cors";

const corsOptions = {
	origin: [
		"http://localhost:5173",
		"https://zayne-commerce.vercel.app",
		"https://www.zayne-commerce.vercel.app",
	],
	credentials: true,
	optionsSuccessStatus: 200,
} satisfies CorsOptions;

export { corsOptions };
