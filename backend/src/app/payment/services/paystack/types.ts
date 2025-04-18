import type { AnyString } from "@zayne-labs/toolkit-type-helpers";
import type { InitTransactionBody } from "./api";

export type PaymentSuccessPayload = Required<InitTransactionBody>["metadata"] & {
	amount: number;
	paidAt: string;
	reference: string;
	status: string;
};

export type PaystackInitResponse = {
	data: PaystackInitData;
	message: string;
	status: boolean;
};

type PaystackInitData = {
	access_code: string;
	authorization_url: string;
	reference: string;
};

export type PaystackChargeSuccessEvent = {
	data: PaystackChargeSuccessData;
	event: "charge.success" | AnyString;
};

type PaystackChargeSuccessData = {
	amount: number;
	authorization: {
		account_name: string;
		authorization_code: string;
		bank: string;
		bin: string;
		brand: string;
		card_type: string;
		country_code: string;
		exp_month: string;
		exp_year: string;
		last4: string;
	};
	channel: string;
	created_at: string;
	currency: string;
	customer: {
		customer_code: string;
		email: string;
		first_name: string;
		id: number;
		last_name: string;
		metadata: unknown;
		phone: string | null;
		risk_action: string;
	};
	domain: string;
	fees: number | null;
	gateway_response: string;
	id: number;
	ip_address: string;
	log: {
		attempts: number;
		authentication: string;
		channel: string | null;
		errors: number;
		history: Array<{
			message: string;
			time: number;
			type: string;
		}>;
		input: unknown[];
		mobile: boolean;
		success: boolean;
		time_spent: number;
	};
	message: string | null;
	metadata: NonNullable<InitTransactionBody["metadata"]>;
	paid_at: string;
	plan: Record<string, never>;
	reference: string;
	status: string;
};
