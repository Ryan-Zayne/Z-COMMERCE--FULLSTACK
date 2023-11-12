import react from '@vitejs/plugin-react-swc';
import { fileURLToPath, URL } from 'node:url';
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
			'/api': {
				target: 'http://localhost:8000',
				changeOrigin: true,
			},
		},
	},
});
