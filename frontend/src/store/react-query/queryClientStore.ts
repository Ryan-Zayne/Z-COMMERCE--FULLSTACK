import type { QueryClient } from "@tanstack/react-query";
import { create } from "zustand";

export const useQueryClientStore = create<{ queryClient: QueryClient }>()(() => ({
	queryClient: null as never,
}));
