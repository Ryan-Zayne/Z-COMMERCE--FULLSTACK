import colors from '@colors/colors';
import cors from 'cors';
import 'dotenv/config.js';
import express from 'express';
import morgan from 'morgan';
import path from 'node:path';
import homepageRouter from './middleware/homepageRouter.js';
import { environment, port } from './utils/constants.js';

colors.enable();

export const app = express();

// Middleware
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

// Routes
app.get('/api/test', (_, res) => res.json({ greeting: 'Flow' }));

// Enables serving of frontend html in production
if (environment === 'production') {
	const distPath = path.resolve('../', 'frontend', 'dist');

	app.use(express.static(distPath));
	app.use(homepageRouter);
}

//* View engine (--disabled)
// app.set('view engine', 'ejs');

//* Enables serving of frontend html in development (--diasbled)
// if (environment === 'development') {
// 	const publicPath = path.resolve('../', 'frontend', 'public');

// 	app.use(express.static(publicPath));
// 	app.use('/src', assetsRouter); // to serve images in the src directory of frontend
// }

app.listen(port, () => console.log(`Server listening on port ${port}`.brightYellow));
