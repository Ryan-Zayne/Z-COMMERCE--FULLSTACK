import { lazy } from 'react';
import { createRoutesFromElements, Route } from 'react-router-dom';

const Home = lazy(() => import('@/pages/Home/Home'));
const AuthLayout = lazy(() => import('@/pages/Layouts/AuthLayout'));
const GlobalLayout = lazy(() => import('@/pages/Layouts/GlobalLayout/GlobalLayout'));
const SignUpFormPage = lazy(() => import('@/pages/AuthPage/SignUpFormPage'));
const LoginFormPage = lazy(() => import('@/pages/AuthPage/LoginFormPage'));
const AllProductsPage = lazy(() => import('@/pages/AllProductsPage'));
const ProductCategoryPage = lazy(() => import('@/pages/ProductCategoryPage'));
const ProductItemPage = lazy(() => import('@/pages/ProductItemPage/ProductItemPage'));
const ErrorPage = lazy(() => import('@/pages/ErrorPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

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

		<Route path="*" element={<NotFoundPage />} />
	</Route>
);

export default routes;
