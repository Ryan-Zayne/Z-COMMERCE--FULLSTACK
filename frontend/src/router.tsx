import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useMountEffect } from "@zayne-labs/toolkit-react";
import { Suspense, lazy } from "react";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router";
import { LoadingSpinner } from "./components/primitives";
import { productLoader, sessionLoader } from "./store/react-query/loaders";
import { queryClient, useQueryClientStore } from "./store/react-query/queryClientStore";

// Layouts
const HomeLayout = lazy(() => import("@/pages/(home)/layout"));
const AuthLayout = lazy(() => import("@/pages/auth/layout"));
const VerifyEmailLayout = lazy(() => import("@/pages/auth/verify-email/layout"));

const NotFoundPage = lazy(() => import("@/pages/not-found"));
const ErrorPage = lazy(() => import("@/pages/error"));

/* eslint-disable react/no-nested-lazy-component-declarations */
const routes = createRoutesFromElements(
	<Route errorElement={<ErrorPage />} loader={sessionLoader}>
		<Route Component={HomeLayout} loader={productLoader} errorElement={<ErrorPage />}>
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

			<Route path="/checkout" Component={lazy(() => import("@/pages/checkout/page"))} />
			<Route path="/checkout/success" Component={lazy(() => import("@/pages/checkout/success/page"))} />
		</Route>

		<Route Component={AuthLayout}>
			<Route path="/auth/signup" Component={lazy(() => import("@/pages/auth/signup/page"))} />
			<Route path="/auth/signin" Component={lazy(() => import("@/pages/auth/signin/page"))} />

			<Route Component={VerifyEmailLayout}>
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
/* eslint-enable react/no-nested-lazy-component-declarations */

const browserRouter = createBrowserRouter(routes);

export function Router() {
	useMountEffect(() => useQueryClientStore.setState({ queryClient }));

	return (
		<QueryClientProvider client={queryClient}>
			<Suspense fallback={<LoadingSpinner />}>
				<RouterProvider router={browserRouter} />
			</Suspense>

			<ReactQueryDevtools buttonPosition="bottom-left" initialIsOpen={false} />
		</QueryClientProvider>
	);
}
