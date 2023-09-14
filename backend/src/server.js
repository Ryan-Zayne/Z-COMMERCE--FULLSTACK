import '@colors/colors';
import cors from 'cors';
import 'dotenv/config.js';
import express from 'express';
import morgan from 'morgan';
import path from 'node:path';
import assetsRouter from './middleware/assetsRouter.js';
import homepageRouter from './middleware/homepageRouter.js';
import { environment, port } from './utils/constants.js';

export const app = express();

// View engine
app.set('view engine', 'ejs');

// Middleware
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

if (environment === 'production') {
	const distPath = path.resolve('../', 'frontend', 'dist');
	app.use(express.static(distPath));
} else {
	const publicPath = path.resolve('../', 'frontend', 'public');
	app.use(express.static(publicPath));
	app.use('/src', assetsRouter); // to serve images in the src directory of frontend
}

// Routes
app.get('/api/test', (_, res) => res.json({ greeting: 'Flow' }));
app.use(homepageRouter);

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Server listening on port ${port}`.brightYellow));
