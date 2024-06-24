import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// prettier-ignore
const getFrontendFilePath = (path: 'src' | `src/${string}`) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
	plugins: [react()],

	resolve: {
		alias: {
			"@": getFrontendFilePath("src"),
		},
	},

	server: {
		proxy: {
			"/api": {
				target: "http://localhost:8000",
				changeOrigin: true,
			},
		},
	},
});
