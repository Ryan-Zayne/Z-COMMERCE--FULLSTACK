import express from 'express';
import path from 'node:path';

const serveHtmlRouter = express.Router();

serveHtmlRouter.get('/*', async (req, res) => {
	res.sendFile(path.resolve('../', 'frontend', 'dist', 'index.html'));
});

export default serveHtmlRouter;
