/* eslint-disable no-console */
import '@colors/colors';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config.js';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'node:path';
import { authRouter } from './auth/auth.routes.js';
import { corsOptions, helmetOptions, setConnectionToDB } from './common/config/index.js';
import { PORT, isDevMode } from './common/lib/utils/constants.js';
import { errorHandler, notFoundHandler, serveHtmlRouter } from './common/middleware/index.js';
import { userRouter } from './users/user.routes.js';

const app = express();

// Middleware - App Security
app.use(helmet(helmetOptions));
app.use(cors(corsOptions));
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

// Middleware - Logger
app.use(morgan('dev'));

// Routes
app.use('/z-api/v1/auth', authRouter);
app.use('/z-api/v1/users', userRouter);

if (!isDevMode) {
	const distPath = path.resolve('../', 'frontend', 'dist');
	app.use(express.static(distPath));
	app.use(serveHtmlRouter);
}

// Route 404 handler
app.all('*', notFoundHandler);

// Central error handler
app.use(errorHandler);

// Connect to DataBase and Listen for server
app.listen(PORT, () => {
	setConnectionToDB();
	console.info(`Server listening at port ${PORT}`.yellow.italic);
});
