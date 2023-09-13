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

	envDir: '../',

	resolve: {
		alias: {
			'@': fileURLToPath(new URL('src', import.meta.url)),
		},
	},

	server: {
		proxy: {
			'/api': {
				target: 'http://localhost:5000',
				changeOrigin: true,
				secure: false,
			},
		},
	},

	build: {
		manifest: true,
		rollupOptions: {
			input: 'src/main.tsx',
		},
	},
});
