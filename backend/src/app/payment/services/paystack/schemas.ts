import { defineSchema } from "@zayne-labs/callapi";
import type { AnyString } from "@zayne-labs/toolkit-type-helpers";
import { z } from "zod";

export const InitializePaymentSchema = z.object({
	amount: z.number().positive("Amount must be positive"),
	cartItems: z.array(
		z.object({
			id: z.string(),
			name: z.string(),
			price: z.number().positive("Price must be positive"),
			quantity: z.int().positive("Quantity must be a positive integer"),
		})
	),
	customerEmail: z.email(),
	customerId: z.string(),
	redirectURL: z.url({ error: "Invalid redirect URL" }).optional(),
});

export const VerifyPaymentSchema = z.object({
	reference: z.string(),
});

const BasePaystackResponseSchema = z.object({
	data: z.unknown(),
	message: z.string(),
	status: z.boolean(),
});

export const PaystackInitTransactionResponseSchema = z.object({
	...BasePaystackResponseSchema.shape,

	data: z.object({
		access_code: z.string(),
		authorization_url: z.string(),
		reference: z.string(),
	}),
});

export const PaystackMetadataSchema = InitializePaymentSchema.pick({
	cartItems: true,
	customerId: true,
});

export const PaystackInitTransactionBodySchema = z.object({
	amount: z.number(),
	callback_url: z.string().optional(),
	email: z.email(),
	metadata: PaystackMetadataSchema.optional(),
	reference: z.string(),
});

const PaystackTransactionStatusEnum = z.literal([
	"abandoned", // Customer has not completed the transaction
	"failed", // Transaction failed
	"ongoing", // Waiting for customer action (OTP/transfer)
	"pending", // Transaction in progress
	"processing", // Similar to pending, specific to direct debit
	"queued", // Transaction queued for later processing
	"reversed", // Transaction reversed/refunded
	"success", // Transaction successful
]);

const PaystackChargeSuccessDataSchema = z.object({
	amount: z.number(),
	authorization: z.object({
		account_name: z.string(),
		authorization_code: z.string(),
		bank: z.string(),
		bin: z.string(),
		brand: z.string(),
		card_type: z.string(),
		country_code: z.string(),
		exp_month: z.string(),
		exp_year: z.string(),
		last4: z.string(),
	}),
	channel: z.string(),
	created_at: z.string(),
	currency: z.string(),
	customer: z.object({
		customer_code: z.string(),
		email: z.email(),
		first_name: z.string(),
		id: z.number(),
		last_name: z.string(),
		metadata: z.unknown(),
		phone: z.string().nullable(),
		risk_action: z.string(),
	}),
	domain: z.string(),
	fees: z.number().nullable(),
	gateway_response: z.string(),
	id: z.number(),
	ip_address: z.string(),
	log: z.object({
		attempts: z.number(),
		authentication: z.string(),
		channel: z.string().nullable(),
		errors: z.number(),
		history: z.array(
			z.object({
				message: z.string(),
				time: z.number(),
				type: z.string(),
			})
		),
		input: z.array(z.unknown()),
		mobile: z.boolean(),
		success: z.boolean(),
		time_spent: z.number(),
	}),
	message: z.string().nullable(),
	metadata: PaystackMetadataSchema,
	paid_at: z.string(),
	plan: z.record(z.string(), z.never()),
	reference: z.string(),
	status: PaystackTransactionStatusEnum,
});

const PaystackChargeEventTypeEnum = z
	.literal("charge.success")
	.or(z.string().transform<AnyString>((val) => val));

export const paystackApiSchema = defineSchema({
	"/transaction/initialize": {
		body: PaystackInitTransactionBodySchema,
		data: PaystackInitTransactionResponseSchema,
		method: z.literal("POST"),
	},

	"/transaction/verify/:reference": {
		data: z.object({
			data: PaystackChargeSuccessDataSchema,
			event: PaystackChargeEventTypeEnum,
		}),
	},
});
