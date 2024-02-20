// NOTE - This feature is no longer in use.
import express from "express";

const assetsPathRouter = express.Router();

/**
 * A regular expression pattern for matching image file paths.
 * The pattern matches paths that start with "/src/", followed by one or more characters,
 * followed by a forward slash, followed by one or more characters that are not a forward slash,
 * and ending with one of the specified image file extensions (svg, png, jpg, jpeg, webp).
 *
 * @type {RegExp}
 * @const
 * @memberof assetsPathRouter
 */
const imageRegex = /\/.+\.(svg|png|jpg|jpeg|webp)$/;

/**
 * Handles GET requests for image files.
 * If a match is found between the requested URL path and the imageRegex pattern,
 * it extracts the file path from the request and redirects the client to the front-end's localhost server, hence allow the backend to serve the image.
 *
 * @function
 * @memberof assetsPathRouter
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 */
assetsPathRouter.get(imageRegex, (req, res) => {
	const filePath = req.path;
	res.redirect(303, `http://localhost:5173/src/assets/${filePath}`);
});

export default assetsPathRouter;
