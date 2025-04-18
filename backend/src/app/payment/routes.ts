import { protect } from "@/middleware";
import express from "express";
import { initialize } from "./controllers";

const router = express.Router();

router.post("/initialize", protect, initialize);

export { router as paymentRouter };
