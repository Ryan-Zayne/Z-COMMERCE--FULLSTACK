import express from "express";
import { IpFilter } from "express-ipfilter";
import { initialize, verifyWithApi, verifyWithHook } from "./handlers";

const allowedDevPaystackIPs = ["127.0.0.1", "::1", "::ffff:127.0.0.1"];

const allowedPaystackIPs = ["52.31.139.75", "52.49.173.169", "52.214.14.220"];

const router = express.Router();

/**
 * @swagger
 * /api/v1/payment/paystack/initialize:
 *   post:
 *     summary: Initialize a payment transaction with Paystack
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - email
 *             properties:
 *               amount:
 *                 type: number
 *                 description: Amount in kobo (smallest currency unit)
 *                 example: 500000
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Customer's email address
 *                 example: customer@example.com
 *     responses:
 *       200:
 *         description: Payment initialization successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     authorization_url:
 *                       type: string
 *                       example: https://checkout.paystack.com/0123456789
 *                     access_code:
 *                       type: string
 *                       example: 0123456789
 *                     reference:
 *                       type: string
 *                       example: ref_123456789
 *       400:
 *         description: Invalid request body
 */
router.post("/paystack/initialize", initialize);

/**
 * @swagger
 * /api/v1/payment/paystack/verify-with-hook:
 *   post:
 *     summary: Webhook endpoint for Paystack payment verification
 *     tags: [Payment]
 *     description: This endpoint is called by Paystack to notify of payment status changes. Access is restricted by IP.
 *     responses:
 *       200:
 *         description: Webhook processed successfully
 *       403:
 *         description: Forbidden - IP not allowed
 */
router.post(
	"/paystack/verify-with-hook",
	IpFilter([...allowedPaystackIPs, ...allowedDevPaystackIPs], { mode: "allow" }),
	verifyWithHook
);

/**
 * @swagger
 * /api/v1/payment/paystack/verify:
 *   post:
 *     summary: Verify a payment transaction manually
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reference
 *             properties:
 *               reference:
 *                 type: string
 *                 description: Transaction reference from Paystack
 *                 example: ref_123456789
 *     responses:
 *       200:
 *         description: Payment verification successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: success
 *                     reference:
 *                       type: string
 *                       example: ref_123456789
 *                     amount:
 *                       type: number
 *                       example: 500000
 *       400:
 *         description: Invalid reference
 *       404:
 *         description: Transaction not found
 */
router.post("/paystack/verify", verifyWithApi);

export { router as paymentRouter };
