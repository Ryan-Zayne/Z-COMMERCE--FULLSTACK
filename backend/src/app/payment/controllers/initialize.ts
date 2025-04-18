import { catchAsync } from "@/middleware";
import { AppError, AppResponse, omitSensitiveFields } from "@/utils";
import type { PaymentBodySchemaType } from "@/validation";
import { PaymentModel } from "../model";
import { generateUniqueReference, initializeTransaction } from "../services";

const initialize = catchAsync<{
	body: PaymentBodySchemaType;
}>(async (req, res) => {
	const { amount, cartItems, customerEmail, customerId, redirectURL } = req.body;

	const reference = generateUniqueReference();

	const transactionResult = await initializeTransaction({
		amount: amount * 100,
		callback_url: redirectURL,
		email: customerEmail,
		metadata: { cartItems, customerId },
		reference,
	});

	if (!transactionResult.success || !transactionResult.data) {
		throw new AppError(500, "Error processing payment, try again later");
	}

	const payment = await PaymentModel.create({
		amount,
		cartItems,
		customerId,
		email: customerEmail,
		reference,
	});

	return AppResponse(res, 200, "Payment initialized successfully", {
		paymentDetails: omitSensitiveFields(payment),
		paymentUrl: transactionResult.data.authorization_url,
	});
});

export { initialize };
