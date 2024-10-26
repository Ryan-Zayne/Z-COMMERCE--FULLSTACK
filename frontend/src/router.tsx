import GlobalLayout from "@/pages/layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { lazy } from "react";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { getSessionQuery } from "./store/react-query/queryFactory";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			gcTime: 10 * (60 * 1000),
			staleTime: Infinity,
		},
	},
});

const AuthLayout = lazy(() => import("@/pages/AuthPage/layout"));
const Home = lazy(() => import("@/pages/Home/page"));
const AllProductsPage = lazy(() => import("@/pages/AllProductsPage"));
const SignUpFormPage = lazy(() => import("@/pages/AuthPage/SignUpFormPage"));
const SignInFormPage = lazy(() => import("@/pages/AuthPage/SignInFormPage"));
const ProductCategoryPage = lazy(() => import("@/pages/ProductCategoryPage"));
const ProductItemPage = lazy(() => import("@/pages/ProductItemPage"));
const NotFoundPage = lazy(() => import("@/pages/404"));
const ErrorPage = lazy(() => import("@/pages/error"));

const sessionLoader = ($queryClient: QueryClient) => async () => {
	await $queryClient.prefetchQuery(getSessionQuery());

	return null;
};

const routes = createRoutesFromElements(
	<Route errorElement={<ErrorPage />}>
		<Route path="/" element={<GlobalLayout />} loader={sessionLoader(queryClient)}>
			<Route errorElement={<ErrorPage />}>
				<Route index={true} element={<Home />} />
				<Route path="products">
					<Route index={true} element={<AllProductsPage />} />
					<Route path=":category" element={<ProductCategoryPage />} />
					<Route path=":category/:productId" element={<ProductItemPage />} />
				</Route>
			</Route>
		</Route>

		<Route path="/auth" element={<AuthLayout />}>
			<Route path="signup" element={<SignUpFormPage />} />
			<Route path="signin" element={<SignInFormPage />} />
		</Route>

		<Route path="*" element={<NotFoundPage />} />
	</Route>
);

const browserRouter = createBrowserRouter(routes);

export function Router() {
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider future={{ v7_startTransition: true }} router={browserRouter} />
			<ReactQueryDevtools buttonPosition="bottom-left" initialIsOpen={false} />
		</QueryClientProvider>
	);
}
