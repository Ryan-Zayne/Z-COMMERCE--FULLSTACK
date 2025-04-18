import type { HydratedUserType } from "@/app/users/types";
import { catchAsync } from "@/middleware";
import { AppError, AppResponse, omitSensitiveFields } from "@/utils";
import type { PaymentBodySchemaType } from "@/validation";
import { PaymentModel } from "../model";
import { generateUniqueReference, initializeTransaction } from "../services";

const initialize = catchAsync<{
	body: PaymentBodySchemaType;
	user: HydratedUserType;
}>(async (req, res) => {
	const { amount, cartItems, redirectURL } = req.body;

	const currentUser = req.user;

	const reference = generateUniqueReference();

	const transactionResult = await initializeTransaction({
		amount: amount * 100,
		callback_url: redirectURL,
		email: currentUser.email,
		metadata: {
			cartItems,
			customerId: currentUser.id,
		},
		reference,
	});

	if (!transactionResult.success || !transactionResult.data) {
		throw new AppError(500, "Error processing payment, try again later");
	}

	const payment = await PaymentModel.create({
		amount,
		cartItems,
		customerId: currentUser.id,
		email: currentUser.email,
		reference,
	});

	return AppResponse(res, 200, "Payment initialized successfully", {
		paymentDetails: omitSensitiveFields(payment),
		paymentUrl: transactionResult.data.authorization_url,
	});
});

export { initialize };
