import type { z } from "zod";
import type {
	PaystackChargeSuccessEventSchema,
	PaystackInitTransactionBodySchema,
	PaystackMetadataSchema,
} from "./schemas";

export type PaystackInitTransactionBodySchemaType = z.infer<typeof PaystackInitTransactionBodySchema>;

export type PaystackChargeSuccessEventSchemaType = z.infer<typeof PaystackChargeSuccessEventSchema>;

type PaystackMetadataType = z.infer<typeof PaystackMetadataSchema>;

export type PaymentSuccessPayload = PaystackMetadataType
	& Pick<PaystackChargeSuccessEventSchemaType["data"], "amount" | "paid_at" | "reference" | "status">;
