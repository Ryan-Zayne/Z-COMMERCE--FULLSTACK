import { catchAsync } from "@/middleware";
import { AppError, AppResponse, readValidatedBody } from "@/utils";
import { paystackApi, paystackHook, processPayment } from "../services/paystack";
import { VerifyPaymentSchema } from "../services/paystack/apiSchema";

export const verifyWithHook = catchAsync(async (req, res) => {
	await paystackHook(req, { onSuccess: (ctx) => processPayment(ctx.payload) });

	return AppResponse(res, 200, "Transaction successful");
});

export const verifyWithApi = catchAsync<{ body: { reference: string } }>(async (req, res) => {
	const { reference } = readValidatedBody(req, VerifyPaymentSchema);

	const result = await paystackApi.verifyTransaction(reference);

	if (!result.data) {
		throw new AppError(400, result.message);
	}

	if (result.data.status !== "success") {
		throw new AppError(402, "Transaction incomplete", { errors: { status: result.data.status } });
	}

	await processPayment(result.data);

	return AppResponse(res, 200, "Transaction successful");
});
