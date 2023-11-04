import react from '@vitejs/plugin-react-swc';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import typeChecker from 'vite-plugin-checker';

export default defineConfig({
	plugins: [
		react(),
		typeChecker({
			typescript: true,
		}),
	],

	resolve: {
		alias: {
			'@': fileURLToPath(new URL('src', import.meta.url)),
		},
	},

	server: {
		open: ' ',
		proxy: {
			'/z-api': {
				target: 'http://localhost:8000',
				changeOrigin: true,
			},
		},
	},

	//* Enable this to serve html via ejs template (--disabled)
	// build: {
	// 	manifest: true,
	// 	rollupOptions: {
	// 		input: 'src/main.tsx',
	// 	},
	// },
});
