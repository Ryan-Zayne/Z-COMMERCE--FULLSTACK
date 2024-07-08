/* eslint-disable @typescript-eslint/unbound-method */
import mongoose from "mongoose";

const setConnectionToDb = async () => {
	try {
		const connect = await mongoose.connect(process.env.MONGO_URI, {
			autoIndex: process.env.NODE_ENV !== "production",
		});

		console.info(`MongoDB Atlas connected at: ${connect.connection.host}`.cyan.italic.underline);
	} catch (error) {
		console.error(error.message);

		console.error({ error });
	}

	mongoose.connection.on("connected", () => {
		console.info("MongoDB Atlas connected!".bold);
	});

	mongoose.connection.on("disconnected", () => {
		console.error("MongoDB Atlas disconnected!".bold);
	});
};

export { setConnectionToDb };
