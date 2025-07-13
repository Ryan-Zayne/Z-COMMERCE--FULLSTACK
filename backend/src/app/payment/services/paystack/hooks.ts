import crypto from "node:crypto";
import { consola } from "consola";
import type { Request } from "express";
import { ENVIRONMENT } from "@/config/env";
import { AppError } from "@/utils";
import type { PaymentSuccessPayload, PaystackChargeSuccessEvent } from "./types";

type SuccessEventContext = {
	event: PaystackChargeSuccessEvent;
	payload: PaymentSuccessPayload;
};

type PaystackHookOptions = {
	onSuccess: (context: SuccessEventContext) => Promise<void>;
};

export const paystackHook = async (req: Request, options: PaystackHookOptions) => {
	const { onSuccess } = options;

	// == Validate event
	const hash = crypto
		.createHmac("sha512", ENVIRONMENT.PAYSTACK_SECRET_KEY)
		.update(JSON.stringify(req.body))
		.digest("hex");

	if (hash !== req.headers["x-paystack-signature"]) {
		throw new AppError(400, "Invalid Event signature");
	}

	const event = req.body as PaystackChargeSuccessEvent;

	switch (event.event) {
		case "charge.success": {
			const payload = {
				amount: event.data.amount / 100,
				cartItems: event.data.metadata.cartItems,
				customerId: event.data.metadata.customerId,
				paidAt: event.data.paid_at,
				reference: event.data.reference,
				status: event.data.status,
			} satisfies PaymentSuccessPayload;

			await onSuccess({ event, payload });

			consola.success("Event processed successfully");

			break;
		}

		default: {
			consola.error("Event type not handled");
			break;
		}
	}
};
