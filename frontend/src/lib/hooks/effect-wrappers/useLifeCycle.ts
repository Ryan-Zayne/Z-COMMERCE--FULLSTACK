import { useEffect } from "react";
import { useCallbackRef } from "../useCallbackRef";

type LifeCycleOptions = {
	onMount: () => void;
	onUnmount?: () => void;
};

const useLifeCycle = ({ onMount, onUnmount }: LifeCycleOptions) => {
	const savedOnMount = useCallbackRef(onMount);
	const savedOnUnmount = useCallbackRef(onUnmount);

	useEffect(() => {
		savedOnMount();

		return () => {
			savedOnUnmount();
		};
	}, [savedOnMount, savedOnUnmount]);
};

export default useLifeCycle;
