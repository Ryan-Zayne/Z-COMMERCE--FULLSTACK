import { type CallApiParameters, createFetchClient, type ResultModeType } from "@zayne-labs/callapi";
import {
	redirectOn401ErrorPlugin,
	type RedirectOn401ErrorPluginMeta,
	toastPlugin,
	type ToastPluginMeta,
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

const REMOTE_BACKEND_HOST = "https://api-zayne-commerce.onrender.com";
// const REMOTE_BACKEND_HOST = "";

const LOCAL_BACKEND_HOST = "http://localhost:8000";
// const LOCAL_BACKEND_HOST = "";

const BACKEND_HOST = process.env.NODE_ENV === "development" ? LOCAL_BACKEND_HOST : REMOTE_BACKEND_HOST;
// const BACKEND_HOST = REMOTE_BACKEND_HOST;

const BASE_API_URL = `${BACKEND_HOST}/api/v1`;

const sharedFetchClient = createFetchClient({
	baseURL: BASE_API_URL,
	// credentials: "same-origin",
	credentials: "include",
	plugins: [redirectOn401ErrorPlugin(), toastPlugin()],
});

export const callBackendApi = <
	TData = unknown,
	TErrorData = unknown,
	TResultMode extends ResultModeType = ResultModeType,
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
