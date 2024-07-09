import "module-alias/register";
import "@colors/colors";
import path from "node:path";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import { authRouter } from "./auth/routes";
import { corsOptions, helmetOptions, rateLimitOptions, setConnectionToDb } from "./common/config";
import { PORT, isDevMode } from "./common/lib/constants";
import { errorHandler, notFoundHandler } from "./common/middleware";
import { userRouter } from "./users/routes";

const app = express();

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

// Middleware - App Security
app.use(helmet(helmetOptions));
app.use(cors(corsOptions));
app.use(rateLimit(rateLimitOptions));

// Middleware - Logger
app.use(morgan("dev"));

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);

// Serve Frontend if needed in production
if (!isDevMode) {
	// Serve up dist folder as static files
	const pathToDistFolder = path.resolve("../", "frontend", "dist");
	app.use(express.static(pathToDistFolder));

	// Serve up index.html file for all routes
	app.get("/*", (_, res) => {
		const pathToHtmlFile = path.resolve("../", "frontend", "dist", "index.html");
		res.sendFile(pathToHtmlFile);
	});
}

// Route 404 handler
app.all("*", notFoundHandler);

// Central error handler
app.use(errorHandler);

//  UncaughtException handler
process.on("uncaughtException", (error) => {
	console.error("UNCAUGHT EXCEPTION! 💥 Server Shutting down...");

	const errorInfo = {
		title: `Uncaught Exception: ${error.name}`,
		message: error.message,
		stackTrace: error.stack,

		date: new Date().toLocaleString("en-Nigeria", {
			timeZone: "Africa/Lagos",
			dateStyle: "full",
			timeStyle: "medium",
		}),
	};

	console.error(errorInfo);

	// eslint-disable-next-line n/no-process-exit
	process.exit(1);
});

// Connect to DataBase and Listen for server
app.listen(PORT, () => {
	void setConnectionToDb();
	console.info(`Server listening at port ${PORT}`.yellow.italic);
});
