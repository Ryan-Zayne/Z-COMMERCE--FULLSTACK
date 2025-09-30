import { QueryClient } from "@tanstack/react-query";
import { isServer } from "@zayne-labs/toolkit-core";

const makeQueryClient = () => {
	return new QueryClient({
		defaultOptions: {
			queries: {
				gcTime: 10 * (60 * 1000),
				staleTime: Infinity,
			},
		},
	});
};

let browserQueryClient: QueryClient | undefined;

export const getQueryClient = () => {
	if (isServer()) {
		return makeQueryClient();
	}

	browserQueryClient ??= makeQueryClient();

	return browserQueryClient;
};
