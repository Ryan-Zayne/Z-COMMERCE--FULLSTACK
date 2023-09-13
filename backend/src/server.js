import colors from '@colors/colors';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import path from 'node:path';
import assetsRouter from './middleware/assetsRouter.js';
import homepageRouter from './middleware/homepageRouter.js';

dotenv.config({ path: path.resolve('../', '.env') });
colors.enable();

// App instance
export const app = express();

const port = process.env.PORT ?? 5001;
const publicPath = path.resolve('../', 'frontend', 'public');

app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.static(publicPath));

// Routes
app.use('/src', assetsRouter);
app.get('/api/test', (_, res) => res.json({ greeting: 'Flow' }));

app.use(homepageRouter);

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Server listening on port ${port}`));
