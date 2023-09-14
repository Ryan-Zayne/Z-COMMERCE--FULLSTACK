import express from 'express';
import path from 'node:path';

const homepageRouter = express.Router();

homepageRouter.get('/', async (req, res) => {
	//* Supplies manifest and environment data to ejs view template(--disabled)
	// const data = {
	// 	environment,
	// 	manifest: await parseManifest(),
	// };

	// res.render(path.resolve('src', 'views', 'index.html.ejs'), data);

	res.sendFile(path.resolve('../', 'frontend', 'dist', 'index.html'));
});

export default homepageRouter;
