import { useMediaQuery } from '@/hooks';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Suspense } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { DismissableToaster, Loader } from './components';
import { routes } from './routes';

AOS.init();

function App() {
	useMediaQuery();

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
