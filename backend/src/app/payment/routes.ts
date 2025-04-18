import { protect, validateBodyWithZod } from "@/middleware";
import { PaymentBodySchema } from "@/validation";
import express from "express";
import { IpFilter } from "express-ipfilter";
import { z } from "zod";
import { initialize, verifyWithApi, verifyWithHook } from "./controllers";

const allowedPaystackIPs = ["52.31.139.75", "52.49.173.169", "52.214.14.220"];

const router = express.Router();

router.post("/paystack/initialize", validateBodyWithZod(PaymentBodySchema), protect, initialize);

router.post(
	"/paystack/verify-with-hook",
	IpFilter(allowedPaystackIPs, { mode: "allow" }),
	protect,
	verifyWithHook
);

router.post(
	"/paystack/verify",
	validateBodyWithZod(z.object({ reference: z.string() })),
	protect,
	verifyWithApi
);

export { router as paymentRouter };
