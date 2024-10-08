import { ENVIRONMENT } from "@/common/env";
import mongoose from "mongoose";
import { isProduction } from "../constants";

const setConnectionToDb = async () => {
	try {
		const connect = await mongoose.connect(ENVIRONMENT.MONGO_URI, {
			autoIndex: isProduction,
		});

		console.info(`MongoDB Atlas connected at: ${connect.connection.host}`.cyan.italic.underline);
	} catch (error) {
		console.error(error);
	}

	/* eslint-disable ts-eslint/unbound-method */
	/* eslint-disable ts-eslint/no-deprecated */
	mongoose.connection.on("connected", () => {
		console.info("MongoDB Atlas connected!".bold);
	});

	mongoose.connection.on("disconnected", () => {
		console.error("MongoDB Atlas disconnected!".bold);
	});
};

export { setConnectionToDb };
