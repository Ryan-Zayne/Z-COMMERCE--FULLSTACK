import { LazyMotion, domAnimation } from "framer-motion";
import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { LoadingSpinner } from "./components/primitives";
import { SonnerToaster } from "./components/ui";
import { router } from "./pages/routes";
import { useGlobalStore } from "./store/zustand/globalStore";

useGlobalStore.getState().actions.handleQueryListeners("add");

function App() {
	return (
		<LazyMotion features={domAnimation} strict={true}>
			<Suspense fallback={<LoadingSpinner />}>
				<RouterProvider future={{ v7_startTransition: true }} router={router} />
			</Suspense>

			<SonnerToaster />
		</LazyMotion>
	);
}

export default App;
