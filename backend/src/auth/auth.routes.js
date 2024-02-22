import express from "express";
import { preventTokenReuse } from "../common/middleware/preventTokenReuse.middleware.js";
import { validateDataWithZod } from "../common/middleware/validateDataWithZod.middleware.js";
import { verifyUser } from "../common/middleware/verifyUser.middleware.js";
import { loginUser, logoutUser, refreshTokenHandler, signUpUser } from "./authControllers/index.js";

const router = express.Router();

router.get("/refresh", preventTokenReuse, refreshTokenHandler);
router.get("/logout", verifyUser, logoutUser);

router.use(validateDataWithZod);

router.post("/sign-up", signUpUser);
router.post("/login", loginUser);

export { router as authRouter };
