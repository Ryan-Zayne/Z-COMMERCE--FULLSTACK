import { useMediaQuery } from '@/hooks';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Suspense, lazy } from 'react';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { DismissableToaster, Loader } from './components';

const Home = lazy(() => import('./pages/Home/Home'));
const AuthLayout = lazy(() => import('./pages/Layouts/AuthLayout'));
const GlobalLayout = lazy(() => import('./pages/Layouts/GlobalLayout/GlobalLayout'));
const SignUpForm = lazy(() => import('./pages/AuthPage/SignUpForm'));
const LoginForm = lazy(() => import('./pages/AuthPage/LoginForm'));
const AllProductsPage = lazy(() => import('./pages/AllProductsPage/AllProductsPage'));
const ProductCategoryPage = lazy(() => import('./pages/ProductCategoryPage/ProductCategoryPage'));
const ProductItemPage = lazy(() => import('./pages/ProductItemPage/ProductItemPage'));
const ErrorElement = lazy(() => import('./pages/ErrorElement'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));

AOS.init();

function App() {
	useMediaQuery();

	const routes = createRoutesFromElements(
		<Route errorElement={<ErrorElement />}>
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

			<Route path="*" element={<PageNotFound />} />
		</Route>
	);

	return (
		<>
			<Suspense fallback={<Loader />}>
				<RouterProvider router={createBrowserRouter(routes)} />
			</Suspense>

			<DismissableToaster />
		</>
	);
}

export default App;
