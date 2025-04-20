import { validateBodyWithZod } from "@/middleware";
import { PaymentBodySchema } from "@/validation";
import express from "express";
import { IpFilter } from "express-ipfilter";
import { z } from "zod";
import { initialize, verifyWithApi, verifyWithHook } from "./controllers";

const allowedDevPaystackIPs = ["127.0.0.1", "::1", "::ffff:127.0.0.1"];

const allowedPaystackIPs = ["52.31.139.75", "52.49.173.169", "52.214.14.220"];

const router = express.Router();

router.post("/paystack/initialize", validateBodyWithZod(PaymentBodySchema), initialize);

router.post(
	"/paystack/verify-with-hook",
	IpFilter([...allowedPaystackIPs, ...allowedDevPaystackIPs], { mode: "allow" }),
	verifyWithHook
);

router.post("/paystack/verify", validateBodyWithZod(z.object({ reference: z.string() })), verifyWithApi);

export { router as paymentRouter };
