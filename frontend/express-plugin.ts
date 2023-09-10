import type { ViteDevServer } from 'vite';

const express = (path: string) => ({
	name: 'vite-plugin-express',
	configureServer: async (server: ViteDevServer) => {
		server.middlewares.use(async (req, res, next) => {
			process.env.IS_VITE_PLUGIN = 'true';

			try {
				const { app } = await server.ssrLoadModule(path);
				app(req, res, next);
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error(error);
			}
		});
	},
});

export default express;
