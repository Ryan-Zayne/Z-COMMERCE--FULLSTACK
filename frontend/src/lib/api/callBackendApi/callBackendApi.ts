import { type CallApiParameters, type ResultModeUnion, createFetchClient } from "@zayne-labs/callapi";
import type { AnyFunction } from "@zayne-labs/toolkit-type-helpers";
import { redirectOn401Error } from "./plugins";

export type ApiSuccessType<TData> = {
	data: TData | null;
	message: string;
	status: true;
};

export type ApiErrorType<TError = never> = {
	errors?: TError;
	message: string;
	stackTrace: string;
	status: false;
};

declare module "@zayne-labs/callapi" {
	type GlobalMeta = {
		redirectOn401Error?:
			| boolean
			| {
					navigateFn?: AnyFunction;
					onRedirect: () => void;
					path?: never;
			  }
			| {
					navigateFn?: AnyFunction;
					onRedirect?: never;
					path?: `/${string}`;
			  };
		toast?: {
			success: boolean;
		};
	};

	// eslint-disable-next-line ts-eslint/consistent-type-definitions
	interface Register {
		meta: GlobalMeta;
	}
}

const sharedFetchClient = createFetchClient({
	baseURL: "/api/v1",
	credentials: "same-origin",
	plugins: [redirectOn401Error()],
});

export const callBackendApi = <
	TData = unknown,
	TErrorData = unknown,
	TResultMode extends ResultModeUnion = ResultModeUnion,
>(
	...parameters: CallApiParameters<ApiSuccessType<TData>, ApiErrorType<TErrorData>, TResultMode>
) => {
	const [url, config] = parameters;

	return sharedFetchClient(url, config);
};

export const callBackendApiForQuery = <TData = unknown>(
	...parameters: CallApiParameters<ApiSuccessType<TData>, false | undefined>
) => {
	const [url, config] = parameters;

	return sharedFetchClient(url, {
		resultMode: "onlySuccessWithException",
		throwOnError: true,
		...config,
	});
};
