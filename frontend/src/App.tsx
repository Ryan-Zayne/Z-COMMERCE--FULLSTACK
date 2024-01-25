import { useMediaQuery } from "@/lib/hooks";
import AOS from "aos";
import "aos/dist/aos.css";
import { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { LoadingSpinner } from "./components/primitives";
import { DismissableToaster } from "./components/ui";
import { routes } from "./pages/routes";

AOS.init();

function App() {
	useMediaQuery();

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
