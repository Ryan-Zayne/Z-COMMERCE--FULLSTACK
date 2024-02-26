import GlobalLayout from "@/layouts/GlobalLayout";
import { lazy } from "react";
import { Route, createRoutesFromElements } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import Home from "./Home/Home";

const AuthLayout = lazy(() => import("@/layouts/AuthLayout"));
const AllProductsPage = lazy(() => import("@/pages/AllProductsPage"));
const SignUpFormPage = lazy(() => import("@/pages/AuthPage/SignUpFormPage"));
const LoginFormPage = lazy(() => import("@/pages/AuthPage/LoginFormPage"));
const ProductCategoryPage = lazy(() => import("@/pages/ProductCategoryPage"));
const ProductItemPage = lazy(() => import("@/pages/ProductItemPage/ProductItemPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

const routes = createRoutesFromElements(
	<Route errorElement={<ErrorPage />}>
		{/* Global Layout */}
		<Route path="/" element={<GlobalLayout />}>
			<Route index={true} element={<Home />} />
			<Route path="products">
				<Route index={true} element={<AllProductsPage />} />
				<Route path=":category" element={<ProductCategoryPage />} />
				<Route path=":category/:productId" element={<ProductItemPage />} />
			</Route>
		</Route>

		{/* Auth Layout */}
		<Route path="auth" element={<AuthLayout />}>
			<Route path="sign-up" element={<SignUpFormPage />} />
			<Route path="login" element={<LoginFormPage />} />
		</Route>

		{/* 404 Page */}
		<Route path="*" element={<NotFoundPage />} />
	</Route>
);

export { routes };
