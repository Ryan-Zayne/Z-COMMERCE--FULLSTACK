import express from 'express';
import path from 'node:path';

const homepageRouter = express.Router();

homepageRouter.get('/*', (_, res) => {
	res.sendFile(path.resolve('../', 'frontend', 'index.html'));
	// res.render(path.resolve('src', 'views', 'index.html.ejs'));
});

export default homepageRouter;
