/* eslint-disable unicorn/error-message */
/* eslint-disable no-console */
import mongoose from 'mongoose';
import { PORT } from '../utils/constants.js';

const setConnectionToDB = async (app) => {
	// prettier-ignore
	try {
		const connect = await mongoose.connect(process.env.MONGO_URI);

		console.info(`MongoDB Atlas connected at: ${connect.connection.host}`.cyan.italic.underline);

		app.listen(PORT, () => console.info(`Server listening at port ${PORT}`.yellow));

	} catch {
		throw new Error('Failed connection to MongoDB Atlas!'.bold);
	}
};

export default setConnectionToDB;
