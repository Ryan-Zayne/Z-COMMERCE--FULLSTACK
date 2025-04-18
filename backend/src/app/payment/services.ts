import { ENVIRONMENT } from "@/config/env";
import { generateRandomUUID } from "@/utils";
import type { PaymentBodySchemaType } from "@/validation";
import { createFetchClient } from "@zayne-labs/callapi";

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
		cartItems: PaymentBodySchemaType["cartItems"];
		customerId: string;
	};
	reference: string;
};

export type PaystackInitResponse = {
	data: {
		access_code: string;
		authorization_url: string;
		reference: string;
	};
	message: string;
	status: boolean;
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
			status: false,
		};
	}

	return {
		data: result.data.data,
		message: result.data.message,
		status: true,
	};
};

export const generateUniqueReference = () => {
	const prefix = "Z-RF";
	const randomCharacters = generateRandomUUID();

	return `${prefix}_${randomCharacters}`;
};
