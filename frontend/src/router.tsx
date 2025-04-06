import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useMountEffect } from "@zayne-labs/toolkit-react";
import { lazy } from "react";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router";
import { useQueryClientStore } from "./store/react-query/queryClientStore";
import { sessionQuery } from "./store/react-query/queryFactory";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			gcTime: 10 * (60 * 1000),
			staleTime: Infinity,
		},
	},
});

const NotFoundPage = lazy(() => import("@/pages/not-found"));
const ErrorPage = lazy(() => import("@/pages/error"));

const sessionLoader = () => {
	void queryClient.prefetchQuery(sessionQuery());

	return null;
};

const routes = createRoutesFromElements(
	<Route errorElement={<ErrorPage />} loader={sessionLoader}>
		<Route Component={lazy(() => import("@/pages/(home)/layout"))} errorElement={<ErrorPage />}>
			<Route path="/" Component={lazy(() => import("@/pages/(home)/page"))} />

			<Route path="/products" Component={lazy(() => import("@/pages/products/page"))} />
			<Route
				path="/products/:category"
				Component={lazy(() => import("@/pages/products/[category]/page"))}
			/>
			<Route
				path="/products/:category/:productId"
				Component={lazy(() => import("@/pages/products/[category]/[productId]/page"))}
			/>
			<Route path="/about" Component={lazy(() => import("@/pages/(home)/about/page"))} />
		</Route>

		<Route Component={lazy(() => import("@/pages/auth/layout"))}>
			<Route path="/auth/signup" Component={lazy(() => import("@/pages/auth/signup/page"))} />
			<Route path="/auth/signin" Component={lazy(() => import("@/pages/auth/signin/page"))} />

			<Route Component={lazy(() => import("@/pages/auth/verify-email/layout"))}>
				<Route
					path="/auth/verify-email"
					Component={lazy(() => import("@/pages/auth/verify-email/page"))}
				/>
				<Route
					path="/auth/verify-email/:token"
					Component={lazy(() => import("@/pages/auth/verify-email/[token]/page"))}
				/>
				<Route
					path="/auth/verify-email/success"
					Component={lazy(() => import("@/pages/auth/verify-email/success/page"))}
				/>
			</Route>
		</Route>

		<Route path="*" element={<NotFoundPage />} />
	</Route>
);

const browserRouter = createBrowserRouter(routes);

export function Router() {
	useMountEffect(() => useQueryClientStore.setState({ queryClient }));

	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={browserRouter} />

			<ReactQueryDevtools buttonPosition="bottom-left" initialIsOpen={false} />
		</QueryClientProvider>
	);
}
