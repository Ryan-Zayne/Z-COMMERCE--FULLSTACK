import {
	type CallApiResultErrorVariant,
	type ErrorContext,
	type RequestContext,
	type SuccessContext,
	definePlugin,
} from "@zayne-labs/callapi";
import { isHTTPError } from "@zayne-labs/callapi/utils";
import { toast } from "sonner";
import type { ApiErrorResponse, ApiSuccessResponse } from "../callBackendApi";

export type ToastPluginMeta = {
	toast?: {
		error?: boolean;
		errorMessageField?: string;
		errorsToSkip?: Array<CallApiResultErrorVariant<unknown>["error"]["name"]>;
		errorsToSkipCondition?: (error: CallApiResultErrorVariant<ApiErrorResponse>["error"]) => boolean;
		success?: boolean;
	};
};

export const toastPlugin = definePlugin(() => ({
	/* eslint-disable perfectionist/sort-objects */
	id: "toast",
	name: "toastPlugin",

	hooks: {
		/* eslint-enable perfectionist/sort-objects */

		onError: (ctx: ErrorContext<ApiErrorResponse> & RequestContext) => {
			const toastMeta = ctx.options.meta?.toast;

			const shouldSkipError =
				!toastMeta?.error
				|| toastMeta.errorsToSkip?.includes(ctx.error.name) // eslint-disable-next-line ts-eslint/prefer-nullish-coalescing
				|| toastMeta.errorsToSkipCondition?.(ctx.error);

			if (shouldSkipError) return;

			const errorMessageField = ctx.options.meta?.toast?.errorMessageField ?? "message";

			const errorMessage = isHTTPError(ctx.error)
				? (ctx.error.errorData.errors?.[errorMessageField] ?? ctx.error.message)
				: ctx.error.message;

			errorMessage && toast.error(errorMessage);
		},

		onSuccess: (ctx: RequestContext & SuccessContext<ApiSuccessResponse<unknown>>) => {
			const successMessage = ctx.data.message;

			const shouldDisplayToast = Boolean(successMessage) && ctx.options.meta?.toast?.success;

			if (!shouldDisplayToast) return;

			toast.success(successMessage);
		},
	},
}));
