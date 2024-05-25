import AOS from "aos";
import "aos/dist/aos.css";
import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { LoadingSpinner } from "./components/primitives";
import { SonnerToaster } from "./components/ui";
import { router } from "./pages/routes";
import { useGlobalStore } from "./store/zustand/globalStore";

AOS.init();

useGlobalStore.getState().mediaQueryActions.handleQueryListeners("add");

function App() {
	return (
		<>
			<Suspense fallback={<LoadingSpinner />}>
				<RouterProvider router={router} future={{ v7_startTransition: true }} />
			</Suspense>

			<SonnerToaster />
		</>
	);
}

export default App;
