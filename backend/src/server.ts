import "@colors/colors";
import path from "node:path";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import mongoSanitize from "express-mongo-sanitize";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";
import { authRouter } from "./auth/routes";
import { corsOptions, helmetOptions, rateLimitOptions, setConnectionToDb } from "./common/config";
import { PORT, isProduction } from "./common/constants";
import { ENVIRONMENT } from "./common/env";
import { errorHandler, notFoundHandler, validateDataWithZod } from "./common/middleware";
import { AppResponse } from "./common/utils/appResponse";
import { userRouter } from "./users/routes";

const app = express();

/**
 * Express configuration
 */
app.set("trust proxy", ["loopback", "linklocal", "uniquelocal"]); // Enable trust proxy
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(ENVIRONMENT.COOKIE_SECRET));

/**
 * Middleware - App Security
 */
app.use(helmet(helmetOptions));
app.use(cors(corsOptions)); // Cors
app.use(rateLimit(rateLimitOptions)); // Rate Limiting
app.use(mongoSanitize()); // Data sanitization against NoSQL query injection
app.use(hpp()); // Prevent Parameter Pollution
// Prevent browser from caching sensitive information
app.use((_, res, next) => {
	res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
	res.set("Pragma", "no-cache");
	res.set("Expires", "0");
	next();
});

/**
 * Middleware - Logger
 */
app.use(morgan("dev"));

/**
 * Routes - v1
 */
app.use("/api/v1/alive", (req, res) => AppResponse(res, 200, "Server is up and running"));
app.use("/api/*", validateDataWithZod);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);

/**
 * Serve Frontend if needed in production
 */
if (isProduction) {
	const pathToDistFolder = path.resolve("../", "frontend", "dist");

	// Serve up dist folder as static files
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

// UncaughtException handler
process.on("uncaughtException", (error) => {
	console.error("UNCAUGHT EXCEPTION! 💥 Server Shutting down...");

	console.error({
		date: new Date().toLocaleString("en-Nigeria", {
			dateStyle: "full",
			timeStyle: "medium",
			timeZone: "Africa/Lagos",
		}),
		message: error.message,
		stackTrace: error.stack,

		title: `Uncaught Exception: ${error.name}`,
	});

	// eslint-disable-next-line node/no-process-exit
	process.exit(1);
});

// Connect to DataBase and Listen for server
app.listen(PORT, () => {
	void setConnectionToDb();
	console.info(`Server listening at port ${PORT}`.yellow.italic);
});
