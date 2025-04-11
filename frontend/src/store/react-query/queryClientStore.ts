import { QueryClient } from "@tanstack/react-query";
import { create } from "zustand";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			gcTime: 10 * (60 * 1000),
			staleTime: Infinity,
		},
	},
});

export const useQueryClientStore = create<{ queryClient: QueryClient }>()(() => ({ queryClient }));
