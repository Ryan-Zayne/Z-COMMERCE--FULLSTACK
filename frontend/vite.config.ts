import react from '@vitejs/plugin-react-swc';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

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

	server: {
		open: '',
		proxy: {
			'/api': {
				target: 'http://localhost:5000',
				changeOrigin: true,
				secure: false,
			},
		},
	},

	//* Enable this in order to serve html via ejs template (--disabled)
	// build: {
	// 	manifest: true,
	// 	rollupOptions: {
	// 		input: 'src/main.tsx',
	// 	},
	// },
});
