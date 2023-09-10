import colors from '@colors/colors';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();
colors.enable();

export const app = express();

const port = process.env.PORT ?? 5001;

// Middleware
app.use(express.json());
app.use(cors());

app.get('/api/test', (_, res) => res.json({ greeting: process.env.IS_VITE_PLUGIN }));

if (!process.env.IS_VITE_PLUGIN) {
	const frontendFiles = `${process.cwd()}/dist`;
	app.use(express.static(frontendFiles));

	app.get('/*', (_, res) => {
		res.send(`${frontendFiles}/index.html`);
	});

	// eslint-disable-next-line no-console
	app.listen(port, () => console.log(`Server listening on port ${port}`));
}
