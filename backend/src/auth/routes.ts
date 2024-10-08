import { protect, validateDataWithZod } from "@/common/middleware";
import express from "express";
import { signIn, signOut, signUp } from "./controllers";

const router = express.Router();

router.use(validateDataWithZod);
router.post("/signup", signUp);
router.post("/signin", signIn);

router.use(protect);
router.get("/signout", signOut);

export { router as authRouter };
