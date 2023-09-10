import react from '@vitejs/plugin-react-swc';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import express from './express-plugin';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		express('../backend/src/server.js'),
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
});
