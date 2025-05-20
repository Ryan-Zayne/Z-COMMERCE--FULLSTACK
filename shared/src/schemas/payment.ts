import { z } from "zod/v4";

export const InitializePaymentSchema = z.object({
	amount: z.number(),
	cartItems: z.array(
		z.object({
			id: z.string(),
			name: z.string(),
			price: z.number(),
			quantity: z.number(),
		})
	),
	customerEmail: z.email(),
	customerId: z.string(),
	redirectURL: z.url({ error: "Invalid redirect URL" }).optional(),
});

export type InitializePaymentSchemaType = z.infer<typeof InitializePaymentSchema>;

export const VerifyPaymentSchema = z.object({
	reference: z.string(),
});
