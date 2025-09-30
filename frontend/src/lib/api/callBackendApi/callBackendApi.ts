import { type CallApiParameters, createFetchClient, type ResultModeUnion } from "@zayne-labs/callapi";
import {
	type RedirectOn401ErrorPluginMeta,
	redirectOn401ErrorPlugin,
	type ToastPluginMeta,
	toastPlugin,
} from "./plugins";

export type ApiSuccessResponse<TData> = {
	data?: TData;
	message: string;
	status: "success";
	success: true;
};

export type ApiErrorResponse<TError = Record<string, string>> = {
	errors?: TError;
	message: string;
	status: "error";
	success: false;
};

type GlobalMeta = RedirectOn401ErrorPluginMeta & ToastPluginMeta;

declare module "@zayne-labs/callapi" {
	// eslint-disable-next-line ts-eslint/consistent-type-definitions
	interface Register {
		meta: GlobalMeta;
	}
}

const sharedFetchClient = createFetchClient({
	baseURL: "/api/v1",
	credentials: "same-origin",
	plugins: [redirectOn401ErrorPlugin(), toastPlugin()],
});

export const callBackendApi = <
	TData = unknown,
	TErrorData = unknown,
	TResultMode extends ResultModeUnion = ResultModeUnion,
>(
	...parameters: CallApiParameters<ApiSuccessResponse<TData>, ApiErrorResponse<TErrorData>, TResultMode>
) => {
	const [url, config] = parameters;

	return sharedFetchClient(url, config);
};

export const callBackendApiForQuery = <TData = unknown>(
	...parameters: CallApiParameters<ApiSuccessResponse<TData>, false | undefined>
) => {
	const [url, config] = parameters;

	return sharedFetchClient(url, {
		resultMode: "onlyData",
		throwOnError: true,
		...config,
	});
};
