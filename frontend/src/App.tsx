import { useMediaQuery } from '@/hooks';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Suspense } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Loader } from './components/primitives';
import { DismissableToaster } from './components/ui';
import { routes } from './pages/routes';

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
