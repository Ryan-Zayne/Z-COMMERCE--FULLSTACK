import type { PaymentBodySchemaType } from "@/validation";
import { defineEnum } from "@zayne-labs/toolkit-type-helpers";
import type { Model, SchemaDefinitionProperty } from "mongoose";
import mongoose from "mongoose";

export const PaymentStatusEnum = defineEnum({
	FAILED: "FAILED",
	PAID: "PAID",
	"REFUND-FAILED": "REFUND-FAILED",
	REFUNDED: "REFUNDED",
	UNPAID: "UNPAID",
});

type PaymentType = {
	amount: number;
	cartItems: PaymentBodySchemaType["cartItems"];
	customerId: SchemaDefinitionProperty;
	paymentDate: string;
	paymentMeta: Record<string, unknown>;
	paymentStatus: keyof typeof PaymentStatusEnum;
	reference: string;
};

const cartItemsSchema = new mongoose.Schema<PaymentBodySchemaType["cartItems"][number]>(
	{
		id: {
			type: String,
		},
		name: {
			type: String,
		},
		price: {
			type: Number,
		},
		quantity: {
			type: Number,
		},
	},
	{ _id: false }
);

const PaymentSchema = new mongoose.Schema<PaymentType>({
	cartItems: {
		type: [cartItemsSchema],
	},
	customerId: {
		ref: "User",
		type: mongoose.Schema.Types.ObjectId,
	},
	paymentDate: {
		type: String,
	},
	paymentMeta: {
		type: Object,
	},
	paymentStatus: {
		default: PaymentStatusEnum.UNPAID,
		enum: Object.values(PaymentStatusEnum),
		type: String,
	},
	reference: {
		type: String,
	},
});

export type PaymentModelType = Model<PaymentType>;

export const PaymentModel =
	(mongoose.models.Payment as PaymentModelType | undefined)
	?? mongoose.model<PaymentType, PaymentModelType>("Payment", PaymentSchema);
