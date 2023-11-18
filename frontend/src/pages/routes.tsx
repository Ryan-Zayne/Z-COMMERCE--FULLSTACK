import { lazy } from 'react';
import { createRoutesFromElements, Route } from 'react-router-dom';

const GlobalLayout = lazy(() => import('@/pages/Layouts/GlobalLayout.tsx'));
const AuthLayout = lazy(() => import('@/pages/Layouts/AuthLayout.tsx'));
const Home = lazy(() => import('@/pages/Home/Home.tsx'));
const AllProductsPage = lazy(() => import('@/pages/AllProductsPage.tsx'));
const SignUpFormPage = lazy(() => import('@/pages/AuthPage/SignUpFormPage.tsx'));
const LoginFormPage = lazy(() => import('@/pages/AuthPage/LoginFormPage.tsx'));
const ProductCategoryPage = lazy(() => import('@/pages/ProductCategoryPage.tsx'));
const ProductItemPage = lazy(() => import('@/pages/ProductItemPage/ProductItemPage.tsx'));
const ErrorPage = lazy(() => import('@/pages/ErrorPage.tsx'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage.tsx'));

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

export { routes };
