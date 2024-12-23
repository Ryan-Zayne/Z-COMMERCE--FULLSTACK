import { protect } from "@/middleware";
import express from "express";
import { signIn, signOut, signUp } from "./controllers";
import { session } from "./controllers/session";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);

router.use("/:endpoint", protect);
router.get("/session", session);
router.get("/signout", signOut);

export { router as authRouter };
