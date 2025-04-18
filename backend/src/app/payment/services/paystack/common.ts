import { PaymentStatusEnum } from "@/constants";
import { AppError, generateRandomUUID } from "@/utils";
import { PaymentModel } from "../../model";
import type { PaymentSuccessPayload } from "./types";

export const generateUniqueReference = () => {
	const prefix = "Z-RF";
	const randomCharacters = generateRandomUUID();

	return `${prefix}_${randomCharacters}`;
};

export const processPayment = async (payload: PaymentSuccessPayload) => {
	const payment = await PaymentModel.findOneAndUpdate(
		{ reference: payload.reference },
		{
			amount: payload.amount,
			paymentDate: payload.paidAt,
			paymentMeta: {
				cartItems: payload.cartItems,
				customerId: payload.customerId,
			},
			paymentStatus: PaymentStatusEnum.PAID,
		},
		{ new: true }
	);

	if (!payment) {
		throw new AppError(404, "Error processing payment");
	}

	// == Sent email to user
	// == Proceed with order
};
