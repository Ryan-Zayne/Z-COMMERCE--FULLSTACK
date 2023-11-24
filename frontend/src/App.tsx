import { useMediaQuery } from '@/lib/hooks/index.ts';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Suspense, useLayoutEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { LoadingSpinner } from './components/primitives/index.ts';
import { DismissableToaster } from './components/ui/index.ts';
import { routes } from './pages/routes.tsx';

AOS.init();

function App() {
	useMediaQuery();

	useLayoutEffect(() => {
		const loaderElement = document.querySelector('[data-loader]');

		if (!loaderElement) return;

		loaderElement.remove();
	}, []);

	return (
		<>
			<Suspense fallback={<LoadingSpinner />}>
				<RouterProvider router={createBrowserRouter(routes)} />
			</Suspense>

			<DismissableToaster />
		</>
	);
}

export default App;
