import { monicon } from "@monicon/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import viteTsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [react(), viteTsconfigPaths(), monicon({})],

	server: {
		proxy: {
			"/api": {
				changeOrigin: true,
				target: "http://localhost:8000",
			},
		},
	},
});
