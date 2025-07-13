import { createFetchClient, defineSchema } from "@zayne-labs/callapi";
import { z } from "zod";
import { ENVIRONMENT } from "@/config/env";
import {
	PaystackChargeSuccessEventSchema,
	PaystackInitTransactionBodySchema,
	PaystackInitTransactionResponseSchema,
} from "./schemas";
import type { PaymentSuccessPayload, PaystackInitTransactionBodySchemaType } from "./types";

const schema = defineSchema({
	"/transaction/initialize": {
		body: PaystackInitTransactionBodySchema,
		data: PaystackInitTransactionResponseSchema,
		method: z.literal("POST"),
	},

	"/transaction/verify/:reference": {
		data: PaystackChargeSuccessEventSchema,
	},
});

const callPaystackApi = createFetchClient({
	auth: ENVIRONMENT.PAYSTACK_SECRET_KEY,
	baseURL: ENVIRONMENT.PAYSTACK_HOST,
	schema,
	timeout: 2 * 60 * 1000,
});

export const initializeTransaction = async (body: PaystackInitTransactionBodySchemaType) => {
	const result = await callPaystackApi("/transaction/initialize", {
		body,
		method: "POST",
	});

	if (result.error) {
		return {
			data: null,
			message: "Error fetching banks",
			success: false,
		};
	}

	return {
		data: result.data.data,
		message: result.data.message,
		success: true,
	};
};

export const verifyTransaction = async (reference: string) => {
	const result = await callPaystackApi("/transaction/verify/:reference", { params: { reference } });

	if (result.error) {
		return {
			data: null,
			message: result.error.message || "Error fetching transaction details",
			success: false,
		};
	}

	const payload = {
		amount: result.data.data.amount / 100,
		cartItems: result.data.data.metadata.cartItems,
		customerId: result.data.data.metadata.customerId,
		paid_at: result.data.data.paid_at,
		reference: result.data.data.reference,
		status: result.data.data.status,
	} satisfies PaymentSuccessPayload;

	return {
		data: payload,
		message: "Transaction verified successfully",
		success: true,
	};
};
