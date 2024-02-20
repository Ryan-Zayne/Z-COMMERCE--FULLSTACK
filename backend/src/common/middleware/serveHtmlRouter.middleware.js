import express from "express";
import path from "node:path";

const serveHtmlRouter = express.Router();

serveHtmlRouter.get("/*", (req, res) => {
	const pathToHtml = path.resolve("../", "frontend", "dist", "index.html");
	res.sendFile(pathToHtml);
});

export default serveHtmlRouter;
