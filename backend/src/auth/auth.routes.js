import express from "express";
import { validateDataWithZod } from "../common/lib/schemas/validateDataWithZod.middleware.js";
import { verifyUser } from "../common/middleware/verifyUser.middleware.js";
import { loginUser, logoutUser, refreshTokenHandler, signUpUser } from "./authControllers/index.js";
import { preventTokenReuse } from "./authControllers/refreshTokenHandler/preventTokenReuse.middleware.js";

const router = express.Router();

router.post("/sign-up", validateDataWithZod, signUpUser);
router.post("/login", validateDataWithZod, loginUser);

router.get("/refresh", preventTokenReuse, refreshTokenHandler);
router.get("/logout", verifyUser, logoutUser);

export { router as authRouter };
