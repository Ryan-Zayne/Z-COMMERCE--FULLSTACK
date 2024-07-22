import express from "express";
import { validateDataWithZod } from "../common/middleware/validateDataWithZod";
import { verifyUser } from "../common/middleware/verifyUser";
import { logoutUser, signInUser, signUpUser } from "./controllers";

const router = express.Router();

// router.get("/refresh", preventTokenReuse, refreshTokenHandler);
router.get("/logout", verifyUser, logoutUser);

router.use(validateDataWithZod);

router.post("/sign-up", signUpUser);
router.post("/login", signInUser);

export { router as authRouter };
