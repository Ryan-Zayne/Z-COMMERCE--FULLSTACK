import crypto from "node:crypto";
import { consola } from "consola";
import type { Request } from "express";
import { ENVIRONMENT } from "@/config/env";
import { AppError, readValidatedBody } from "@/utils";
import { PaystackChargeSuccessEventSchema } from "./schemas";
import type { PaymentSuccessPayload, PaystackChargeSuccessEventSchemaType } from "./types";

type SuccessEventContext = {
	event: PaystackChargeSuccessEventSchemaType;
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

	const validBody = readValidatedBody(req, PaystackChargeSuccessEventSchema);

	switch (validBody.event) {
		case "charge.success": {
			const payload = {
				amount: validBody.data.amount / 100,
				cartItems: validBody.data.metadata.cartItems,
				customerId: validBody.data.metadata.customerId,
				paid_at: validBody.data.paid_at,
				reference: validBody.data.reference,
				status: validBody.data.status,
			} satisfies PaymentSuccessPayload;

			await onSuccess({ event: validBody, payload });

			consola.success("Event processed successfully");

			break;
		}

		default: {
			consola.error("Event type not handled");
		}
	}
};
