import { createFetchClient } from "@zayne-labs/callapi";
import { ENVIRONMENT } from "@/config/env";
import type { InitializePaymentSchemaType } from "@/validation";
import type { PaymentSuccessPayload, PaystackChargeSuccessEvent, PaystackInitResponse } from "./types";

const callPaystackApi = createFetchClient({
	auth: ENVIRONMENT.PAYSTACK_SECRET_KEY,
	baseURL: ENVIRONMENT.PAYSTACK_HOST,
	timeout: 2 * 60 * 1000,
});

export type InitTransactionBody = {
	amount: number;
	callback_url?: string;
	email: string;
	metadata?: {
		cartItems: InitializePaymentSchemaType["cartItems"];
		customerId: string;
	};
	reference: string;
};

export const initializeTransaction = async (data: InitTransactionBody) => {
	const result = await callPaystackApi<PaystackInitResponse>("/transaction/initialize", {
		body: data,
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
	const result = await callPaystackApi<PaystackChargeSuccessEvent>(`/transaction/verify/:reference`, {
		params: { reference },
	});

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
		paidAt: result.data.data.paid_at,
		reference: result.data.data.reference,
		status: result.data.data.status,
	} satisfies PaymentSuccessPayload;

	return {
		data: payload,
		message: "Transaction verified successfully",
		success: true,
	};
};
