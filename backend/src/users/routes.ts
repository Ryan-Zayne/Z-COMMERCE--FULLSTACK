import { verifyUser } from "@/common/middleware";
import express from "express";

const router = express.Router();

router.use(verifyUser);

export { router as userRouter };
