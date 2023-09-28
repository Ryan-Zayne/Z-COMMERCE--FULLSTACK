import { useMediaQuery } from '@/hooks';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Suspense, lazy } from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Loader from './components/Loader';
import GlobalLayout from './pages/GlobalLayout/GlobalLayout';

const Home = lazy(() => import('./pages/Home/Home'));
const AllProductsPage = lazy(() => import('./pages/AllProductsPage/AllProductsPage'));
const ProductCategoryPage = lazy(() => import('./pages/ProductCategoryPage/ProductCategoryPage'));
const ProductItemPage = lazy(() => import('./pages/ProductItemPage/ProductItemPage'));
const Register = lazy(() => import('./pages/Register/Register'));
const ErrorElement = lazy(() => import('./pages/ErrorElement'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));

AOS.init();

function App() {
	useMediaQuery();

	const router = createBrowserRouter(
		createRoutesFromElements(
			<>
				<Route path="/" errorElement={<ErrorElement />} element={<GlobalLayout />}>
					<Route index={true} element={<Home />} />
					<Route path="all-products" element={<AllProductsPage />} />
					<Route path=":category" element={<ProductCategoryPage />} />
					<Route path=":category/:productId" element={<ProductItemPage />} />
				</Route>

				<Route errorElement={<ErrorElement />} path="register" element={<Register />} />
				<Route path="*" element={<PageNotFound />} />
			</>
		)
	);

	return (
		<>
			<Suspense fallback={<Loader />}>
				<RouterProvider router={router} />
			</Suspense>

			<Toaster
				toastOptions={{
					success: {
						style: {
							backgroundColor: 'hsl(153, 81%, 12%',
							color: 'hsl(140, 100%, 71%)',
							border: '2px solid hsl(145, 91%, 23%)',
							paddingBlock: '1.5rem',
						},
					},
				}}
			/>
		</>
	);
}

export default App;
