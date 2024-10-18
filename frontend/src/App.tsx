import { LazyMotion, domAnimation } from "framer-motion";
import { Suspense } from "react";
import { LoadingSpinner } from "./components/primitives";
import { SonnerToaster } from "./components/ui";
import { Router } from "./router";
import { useGlobalStore } from "./store/zustand/globalStore";

useGlobalStore.getState().actions.handleQueryListeners("add");

function App() {
	return (
		<LazyMotion features={domAnimation} strict={true}>
			<Suspense fallback={<LoadingSpinner />}>
				<Router />
			</Suspense>

			<SonnerToaster />
		</LazyMotion>
	);
}

export default App;
