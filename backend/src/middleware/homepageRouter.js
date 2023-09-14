import express from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import { environment } from '../utils/constants.js';

const homepageRouter = express.Router();

const parseManifest = async () => {
	if (environment !== 'production') return {};

	const manifestPath = path.resolve('../', 'frontend', 'dist', 'manifest.json');
	const manifestFile = await fs.readFile(manifestPath);

	return JSON.parse(manifestFile);
};

homepageRouter.get('/', async (_, res) => {
	const data = {
		environment,
		manifest: await parseManifest(),
	};

	res.render(path.resolve('src', 'views', 'index.html.ejs'), data);
});

export default homepageRouter;
