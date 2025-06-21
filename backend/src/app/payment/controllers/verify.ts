import { catchAsync } from "@/middleware";
import { AppError, AppResponse } from "@/utils";
import { paystackHook, processPayment, verifyTransaction } from "../services";

export const verifyWithHook = catchAsync(async (req, res) => {
	await paystackHook(req, {
		onSuccess: (ctx) => processPayment(ctx.payload),
	});

	return AppResponse(res, 200, "Transaction successful");
});

export const verifyWithApi = catchAsync<{ body: { reference: string } }>(async (req, res) => {
	const { reference } = req.body;

	const result = await verifyTransaction(reference);

	if (!result.data) {
		throw new AppError(400, result.message);
	}

	if (result.data.status !== "success") {
		throw new AppError(402, "Transaction incomplete", { errors: { status: result.data.status } });
	}

	await processPayment(result.data);

	return AppResponse(res, 200, "Transaction successful");
});
