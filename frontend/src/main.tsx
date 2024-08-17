import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			gcTime: 10 * (60 * 1000),
			staleTime: Number.POSITIVE_INFINITY,
		},
	},
});

createRoot(document.querySelector("#root") as HTMLElement).render(
	<QueryClientProvider client={queryClient}>
		<App />
		<ReactQueryDevtools buttonPosition="bottom-left" initialIsOpen={false} />
	</QueryClientProvider>
);
