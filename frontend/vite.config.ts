import react from '@vitejs/plugin-react-swc';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { checker as typeChecker } from 'vite-plugin-checker';
import { createEntryShakingPlugin as entryTreeShaker } from 'vite-plugin-entry-shaking';

// prettier-ignore
const getFrontendfilePath = (path: 'src' | `src/${string}`) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
	plugins: [
		react(),
		typeChecker({
			typescript: true,
		}),

		await entryTreeShaker({
			targets: [
				getFrontendfilePath('src/components/primitives'),
				getFrontendfilePath('src/components/ui'),
				getFrontendfilePath('src/lib/hooks'),
			],
			extensions: ['ts', 'tsx'],
		}),
	],

	resolve: {
		alias: {
			'@': getFrontendfilePath('src'),
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
