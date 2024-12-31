import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { lazy } from "react";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router";
import { hardNavigate } from "./lib/utils/hardNavigate";
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

useQueryClientStore.setState({ queryClient });

const AuthLayout = lazy(() => import("@/pages/auth/layout"));
const HomeLayout = lazy(() => import("@/pages/(home)/layout"));
const ProtectionLayout = lazy(() => import("@/pages/layout.protect"));
const Home = lazy(() => import("@/pages/(home)/page"));
const AllProductsPage = lazy(() => import("@/pages/products/page"));
const SignUpFormPage = lazy(() => import("@/pages/auth/signup/signup"));
const SignInFormPage = lazy(() => import("@/pages/auth/signin/page"));
const ProductCategoryPage = lazy(() => import("@/pages/products/[category]/page"));
const ProductItemPage = lazy(() => import("@/pages/products/[category]/[productId]/page"));
const NotFoundPage = lazy(() => import("@/pages/not-found"));
const ErrorPage = lazy(() => import("@/pages/error"));
const AboutPage = lazy(() => import("@/pages/(home)/about/page"));

const VerifyEmailLayout = lazy(() => import("@/pages/auth/verify-email/layout"));
const VerifyEmailPage = lazy(() => import("@/pages/auth/verify-email/page"));
const VerificationSuccessPage = lazy(() => import("@/pages/auth/verify-email/success/page"));
const CheckVerificationTokenPage = lazy(() => import("@/pages/auth/verify-email/[token]/page"));

const sessionLoader = () => {
	void queryClient.prefetchQuery(sessionQuery());

	return null;
};

const verifyEmailLoader = () => {
	void queryClient.prefetchQuery(
		sessionQuery({
			onSuccess: ({ data }) => {
				if (data.data?.user.isEmailVerified) {
					hardNavigate("/auth/verify-email/success");
				}
			},
		})
	);

	return null;
};

const routes = createRoutesFromElements(
	<Route errorElement={<ErrorPage />}>
		<Route path="/" element={<HomeLayout />} loader={sessionLoader}>
			<Route errorElement={<ErrorPage />}>
				<Route index={true} element={<Home />} />

				<Route path="products" element={<AllProductsPage />} />
				<Route path="products/:category" element={<ProductCategoryPage />} />
				<Route path="products/:category/:productId" element={<ProductItemPage />} />
				<Route path="about" element={<AboutPage />} />
			</Route>
		</Route>

		<Route element={<AuthLayout />}>
			<Route path="auth/signup" element={<SignUpFormPage />} />
			<Route path="auth/signin" element={<SignInFormPage />} />

			<Route element={<ProtectionLayout />}>
				<Route element={<VerifyEmailLayout />} loader={verifyEmailLoader}>
					<Route path="auth/verify-email" element={<VerifyEmailPage />} />
					<Route path="auth/verify-email/:token" element={<CheckVerificationTokenPage />} />
				</Route>

				<Route path="auth/verify-email/success" element={<VerificationSuccessPage />} />
			</Route>
		</Route>

		<Route path="*" element={<NotFoundPage />} />
	</Route>
);

const browserRouter = createBrowserRouter(routes, {
	future: {
		startTransition: true,
	},
});

export function Router() {
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={browserRouter} />

			<ReactQueryDevtools buttonPosition="bottom-left" initialIsOpen={false} />
		</QueryClientProvider>
	);
}
