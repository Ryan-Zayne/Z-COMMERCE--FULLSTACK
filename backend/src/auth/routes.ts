import express from "express";
import { preventTokenReuse } from "../common/middleware/preventTokenReuse";
import { validateDataWithZod } from "../common/middleware/validateDataWithZod";
import { verifyUser } from "../common/middleware/verifyUser";
import { loginUser, logoutUser, refreshTokenHandler, signUpUser } from "./controllers";

const router = express.Router();

router.get("/refresh", preventTokenReuse, refreshTokenHandler);
router.get("/logout", verifyUser, logoutUser);

router.use(validateDataWithZod);

router.post("/sign-up", signUpUser);
router.post("/login", loginUser);

export { router as authRouter };
