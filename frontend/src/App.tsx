import { useMediaQuery } from '@/lib/hooks/index.ts';
import { SpeedInsights } from '@vercel/speed-insights/react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Suspense } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { LoadingSpinner } from './components/primitives/index.ts';
import { DismissableToaster } from './components/ui/index.ts';
import { routes } from './pages/routes.tsx';

AOS.init();

function App() {
	useMediaQuery();

	return (
		<>
			<Suspense fallback={<LoadingSpinner />}>
				<RouterProvider router={createBrowserRouter(routes)} />
			</Suspense>

			<DismissableToaster />

			<SpeedInsights />
		</>
	);
}

export default App;
