import { useEffect, useRef } from 'react';
import { useCallbackRef } from './useCallbackRef';

/**
 * A thin wrapper around “useEffect” which
will only fire when the value changes, and not on mount.
* */

const useEffectOnChange = <TCleanUp>(callback: () => TCleanUp, deps: React.DependencyList) => {
	const hasMounted = useRef(false);

	const savedEffectCallback = useCallbackRef(callback);

	useEffect(() => {
		if (!hasMounted.current) {
			hasMounted.current = true;
			return;
		}

		savedEffectCallback();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps);
};

export default useEffectOnChange;
