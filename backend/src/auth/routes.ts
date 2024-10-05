import express from "express";
import { validateDataWithZod } from "../common/middleware/validateDataWithZod";
import { verifyUser } from "../common/middleware/verifyUser";
import { logoutUser, signInUser, signUpUser } from "./controllers";

const router = express.Router();

router.get("/logout", verifyUser, logoutUser);

router.use(validateDataWithZod);

router.post("/signup", signUpUser);
router.post("/signin", signInUser);

export { router as authRouter };
