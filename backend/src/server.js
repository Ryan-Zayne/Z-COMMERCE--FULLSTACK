import colors from '@colors/colors';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();
colors.enable();

const app = express();

const port = process.env.PORT ?? 5001;

// Middleware
app.use(express.json());

// Listening for server
app.listen(port, () => console.log(`Server listening on port ${port}`));
