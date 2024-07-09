import { verifyUser } from "@/common/middleware";
import express from "express";
import { updateUserProfile } from "./controllers";

const router = express.Router();

router.use(verifyUser);

router.patch("/update-profile", updateUserProfile);

export { router as userRouter };
