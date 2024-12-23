import { ENVIRONMENT } from "@/config/env";
import { consola } from "consola";
import mongoose from "mongoose";
import { isProduction } from "../constants";

const setConnectionToDb = async () => {
	try {
		const connect = await mongoose.connect(ENVIRONMENT.MONGO_URI, {
			autoIndex: isProduction,
		});

		console.info(`MongoDB Atlas connected at: ${connect.connection.host}`.cyan.italic.underline);
	} catch (error) {
		consola.error(error);
	}

	/* eslint-disable ts-eslint/unbound-method */
	/* eslint-disable ts-eslint/no-deprecated */
	mongoose.connection.on("connected", () => {
		console.info("MongoDB Atlas connected!".bold);
	});

	mongoose.connection.on("disconnected", () => {
		consola.error("MongoDB Atlas disconnected!".bold);
	});
};

export { setConnectionToDb };
