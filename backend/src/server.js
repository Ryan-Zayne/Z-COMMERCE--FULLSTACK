/* eslint-disable no-console */
import '@colors/colors';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config.js';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'node:path';
import authRouter from './auth/auth.routes.js';
import { corsOptions, setConnectionToDB } from './common/config/index.js';
import { errorHandler, notFoundHandler, serveHtmlRouter } from './common/middleware/index.js';
import { PORT, environment } from './common/utils/constants.js';
import userRouter from './users/user.routes.js';

const app = express();

// Middleware - App Security
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Middleware - Logger
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

if (environment === 'production') {
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
	console.info(`Server listening at port ${PORT}`.yellow.italic);
	setConnectionToDB();
});
