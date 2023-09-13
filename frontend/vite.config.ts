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

	server: {
		proxy:{}
	}

	envDir: '../',

	resolve: {
		alias: {
			'@': fileURLToPath(new URL('src', import.meta.url)),
		},
	},

	build: {
		manifest: true,
		rollupOptions: {
			input: 'src/main.tsx',
		},
	},
});
