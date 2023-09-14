import express from 'express';

const assetsRouter = express.Router();

const imageRegex = /\/.+\.(svg|png|jpg|jpeg|webp)$/;

assetsRouter.get(imageRegex, (req, res) => {
	const filePath = req.path;
	console.log(filePath);
	res.redirect(303, `http://localhost:5173/src${filePath}`);
});

export default assetsRouter;
