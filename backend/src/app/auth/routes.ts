import { protect } from "@/middleware";
import express from "express";
import { signIn, signOut, signUp, verifyEmail } from "./controllers";
import { session } from "./controllers/session";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/verify-email", verifyEmail);

// router.use("/:endpoint", protect); // This always ends up hitting routes i don't want
router.get("/session", protect, session);
router.get("/signout", protect, signOut);

export { router as authRouter };
