import { catchAsync } from "@/middleware";
import { AppError, AppResponse, omitSensitiveFields, readValidatedBody } from "@/utils";
import { PaymentModel } from "../model";
import { generateUniqueReference, paystackApi } from "../services/paystack";
import { InitializePaymentSchema } from "../services/paystack/apiSchema";

const initialize = catchAsync(async (req, res) => {
	const { amount, cartItems, customerEmail, customerId, redirectURL } = readValidatedBody(
		req,
		InitializePaymentSchema
	);

	const reference = generateUniqueReference();

	const transactionResult = await paystackApi.initTransaction({
		amount: Math.round(amount) * 100,
		callback_url: redirectURL,
		email: customerEmail,
		metadata: { cartItems, customerId },
		reference,
	});

	if (!transactionResult.success || !transactionResult.data) {
		throw new AppError(400, "Error processing payment, try again later");
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
