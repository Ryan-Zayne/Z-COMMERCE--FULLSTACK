import express from "express";
import { updateUserProfile } from "./controllers";

const { verifyUser } = require("@/common/middleware");

const router = express.Router();

router.use(verifyUser);

router.patch("/update-profile", updateUserProfile);

export { router as userRouter };
