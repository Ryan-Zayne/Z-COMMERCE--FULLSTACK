/* eslint-disable unicorn/error-message */
/* eslint-disable no-console */
import mongoose from 'mongoose';

const setConnectionToDB = async () => {
	// prettier-ignore
	try {
		const connect = await mongoose.connect(process.env.MONGO_URI, { autoIndex: process.env.NODE_ENV !== 'production'});

		console.info(`MongoDB Atlas connected at: ${connect.connection.host}`.cyan.italic.underline);

	} catch(error) {
		throw new Error(error.message);
	}

	mongoose.connection.on('connected', () => {
		console.info('MongoDB Atlas connected!'.bold);
	});

	mongoose.connection.on('disconnected', () => {
		console.error('MongoDB Atlas disconnected!'.bold);
	});
};

export { setConnectionToDB };
