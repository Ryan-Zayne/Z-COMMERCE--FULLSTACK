/* eslint-disable no-console */
import '@colors/colors';
import cors from 'cors';
import 'dotenv/config.js';
import express from 'express';
import morgan from 'morgan';
import path from 'node:path';
import authRouter from './auth/auth.routes.js';
import { corsOptions, setConnectionToDB } from './global/config/index.js';
import { errorHandler, notFoundHandler, serveHtmlRouter } from './global/middleware/index.js';
import { PORT, environment } from './global/utils/constants.js';
import userRouter from './users/user.routes.js';

const app = express();

// Middleware
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

// Serving of frontend html from dist folder in production
if (environment === 'production') {
	const distPath = path.resolve('../', 'frontend', 'dist');
	app.use(express.static(distPath));
	app.use(serveHtmlRouter);
}

// Route Not Found handler
app.use(notFoundHandler);

// Central error handler
app.use(errorHandler);

// Connect to DataBase and Listen for server
app.listen(PORT, async () => {
	await setConnectionToDB();
	console.info(`Server listening at port ${PORT}`.yellow);
});
