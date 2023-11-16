import react from '@vitejs/plugin-react-swc';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import typeChecker from 'vite-plugin-checker';
import entryshaker from 'vite-plugin-entry-shaking';

// prettier-ignore
const getFrontendfilePath = (path: 'src' | `src/${string}`) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
	plugins: [
		react(),
		typeChecker({
			typescript: true,
		}),
		await entryshaker({
			targets: [
				getFrontendfilePath('src/components/primitives'),
				getFrontendfilePath('src/components/ui'),
				getFrontendfilePath('src/hooks'),
				getFrontendfilePath('src/store/react-query'),
			],
		}),
	],

	resolve: {
		alias: {
			'@': getFrontendfilePath('src'),
		},
	},

	server: {
		open: '',
		proxy: {
			'/api': {
				target: 'http://localhost:8000',
				changeOrigin: true,
			},
		},
	},
});
