import { z } from "zod";

export const PaymentBodySchema = z.object({
	amount: z.number(),
	cartItems: z.array(
		z.object({
			id: z.string(),
			name: z.string(),
			price: z.number(),
			quantity: z.number(),
		})
	),
	customerEmail: z.string().email(),
	customerId: z.string(),
	redirectURL: z.string().url({ message: "Invalid redirect URL" }).optional(),
});

export type PaymentBodySchemaType = z.infer<typeof PaymentBodySchema>;
