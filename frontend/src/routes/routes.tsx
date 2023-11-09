import { lazy } from 'react';
import { createRoutesFromElements, Route } from 'react-router-dom';

const Home = lazy(() => import('@/pages/Home/Home'));
const AuthLayout = lazy(() => import('@/pages/Layouts/AuthLayout'));
const GlobalLayout = lazy(() => import('@/pages/Layouts/GlobalLayout/GlobalLayout'));
const SignUpForm = lazy(() => import('@/pages/AuthPage/SignUpForm'));
const LoginForm = lazy(() => import('@/pages/AuthPage/LoginForm'));
const AllProductsPage = lazy(() => import('@/pages/AllProductsPage'));
const ProductCategoryPage = lazy(() => import('@/pages/ProductCategoryPage'));
const ProductItemPage = lazy(() => import('@/pages/ProductItemPage/ProductItemPage'));
const ErrorPage = lazy(() => import('@/pages/ErrorPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

const routes = createRoutesFromElements(
	<Route errorElement={<ErrorPage />}>
		<Route path="/" element={<GlobalLayout />}>
			<Route index={true} element={<Home />} />

			<Route path="products">
				<Route index={true} element={<AllProductsPage />} />
				<Route path=":category" element={<ProductCategoryPage />} />
				<Route path=":category/:productId" element={<ProductItemPage />} />
			</Route>
		</Route>

		<Route path="auth" element={<AuthLayout />}>
			<Route path="sign-up" element={<SignUpForm />} />
			<Route path="login" element={<LoginForm />} />
		</Route>

		<Route path="*" element={<NotFoundPage />} />
	</Route>
);

export default routes;
