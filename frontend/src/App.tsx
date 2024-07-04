import { LazyMotion, domAnimation } from "framer-motion";
import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { LoadingSpinner } from "./components/primitives";
import { SonnerToaster } from "./components/ui";
import { router } from "./pages/routes";
import { useGlobalStore } from "./store/zustand/globalStore";

useGlobalStore.getState().mediaQueryActions.handleQueryListeners("add");

function App() {
	return (
		<LazyMotion strict={true} features={domAnimation}>
			<Suspense fallback={<LoadingSpinner />}>
				<RouterProvider router={router} future={{ v7_startTransition: true }} />
			</Suspense>

			<SonnerToaster />
		</LazyMotion>
	);
}

export default App;
