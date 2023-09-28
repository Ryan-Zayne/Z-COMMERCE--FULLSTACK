import express from 'express';
import path from 'node:path';
import { environment } from '../utils/constants.js';

const serveHtmlRouter = express.Router();

serveHtmlRouter.get('/', async (req, res) => {
	// if (environment === 'development') {
	// 	const data = {
	// 		environment,
	// 		manifest: await parseManifest(),
	// 	};

	// 	res.render(path.resolve('src', 'views', 'index.html.ejs'), data);
	// }

	if (environment === 'production') {
		res.sendFile(path.resolve('../', 'frontend', 'dist', 'index.html'));
	}
});

export default serveHtmlRouter;
