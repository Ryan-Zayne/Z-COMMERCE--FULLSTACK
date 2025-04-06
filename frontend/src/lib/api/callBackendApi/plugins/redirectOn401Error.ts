import { definePlugin } from "@zayne-labs/callapi";
import { hardNavigate } from "@zayne-labs/toolkit-core";
import { isObject } from "@zayne-labs/toolkit-type-helpers";
import { toast } from "sonner";

type Context = {
	routesToSkip?: string[];
};

const defaultRoutesToSkip = ["/auth/signin", "/auth/signup"];

export const redirectOn401Error = definePlugin((context?: Context) => {
	const routesToSkip = [...defaultRoutesToSkip, ...(context?.routesToSkip ?? [])];

	return {
		hooks: {
			onResponseError: ({ options, response }) => {
				const shouldRedirect =
					response.status === 401 && !routesToSkip.some((route) => options.fullURL?.endsWith(route));

				if (!shouldRedirect || options.meta?.redirectOn401Error === false) return;

				const redirectOn401ErrorMeta = isObject(options.meta?.redirectOn401Error)
					? options.meta.redirectOn401Error
					: {};

				const { navigateFn = hardNavigate, onRedirect, path } = redirectOn401ErrorMeta;

				if (onRedirect) {
					onRedirect();
					return;
				}

				toast.error("Unauthorized! Redirecting `to sign in page...", { duration: 2000 });

				navigateFn(path ?? "/auth/signin");
			},
		},

		id: "redirect-on-401-error",

		name: "redirectOn401ErrorPlugin",
	};
});
