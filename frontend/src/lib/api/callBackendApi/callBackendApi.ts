import {
	type CallApiParameters,
	type CallApiPlugin,
	type CallApiResultModeUnion,
	createFetchClient,
} from "@zayne-labs/callapi";
import type { AnyFunction } from "@zayne-labs/toolkit/type-helpers";
import { toast } from "sonner";
import { hardNavigate } from "../../utils/hardNavigate";

export type ApiSuccessType<TData> = {
	data: TData | null;
	message: string;
	status: "success";
};

export type ApiErrorType<TError = never> = {
	errors?: TError;
	message: string;
	stackTrace: string;
	status: "error";
};

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

declare module "@zayne-labs/callapi" {
	// eslint-disable-next-line ts-eslint/consistent-type-definitions
	interface Register {
		meta: GlobalMeta;
	}
}

const routesToSkipFrom401Redirect = ["/auth/signin", "/auth/signup"];

export const definePlugin = <
	// eslint-disable-next-line perfectionist/sort-union-types -- I want the first one to be first
	TPlugin extends CallApiPlugin<never, never> | AnyFunction<CallApiPlugin<never, never>>,
>(
	plugin: TPlugin
) => {
	return plugin;
};

const redirectOn401ErrorPlugin = definePlugin(() => ({
	hooks: {
		onResponseError: ({ options, response }) => {
			const shouldRedirect =
				response.status === 401 &&
				!routesToSkipFrom401Redirect.some((route) => options.fullURL?.endsWith(route));

			const redirectOn404Error =
				options.meta?.redirectOn401Error === true
					? ({} as Record<string, never>)
					: options.meta?.redirectOn401Error;

			if (!shouldRedirect || redirectOn404Error === false) return;

			const { navigateFn = hardNavigate, onRedirect, path } = redirectOn404Error ?? {};

			if (onRedirect) {
				onRedirect();
				return;
			}

			toast.error("Unauthorized! Redirecting `to sign in page...", { duration: 2000 });

			navigateFn(path ?? "/auth/signin");
		},
	},

	id: "redirectOn401ErrorPlugin",

	name: "redirectOn401ErrorPlugin",
}));

const sharedFetchClient = createFetchClient({
	baseURL: "/api/v1",

	credentials: "same-origin",

	plugins: [redirectOn401ErrorPlugin()],
});

export const callBackendApi = <
	TData = unknown,
	TError = unknown,
	TResultMode extends CallApiResultModeUnion = CallApiResultModeUnion,
>(
	...parameters: CallApiParameters<ApiSuccessType<TData>, ApiErrorType<TError>, TResultMode>
) => {
	return sharedFetchClient(...parameters);
};

export const callBackendApiForQuery = <TData = unknown, TError = unknown>(
	...parameters: CallApiParameters<ApiSuccessType<TData>, ApiErrorType<TError>, "onlySuccess">
) => {
	const [url, config] = parameters;

	return sharedFetchClient(url, {
		...config,
		resultMode: "onlySuccess",
		throwOnError: true,
	});
};
