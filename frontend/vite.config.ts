import react from '@vitejs/plugin-react-swc';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		checker({
			typescript: true,
		}),
	],

	resolve: {
		alias: {
			'@': fileURLToPath(new URL('src', import.meta.url)),
		},
	},
});
