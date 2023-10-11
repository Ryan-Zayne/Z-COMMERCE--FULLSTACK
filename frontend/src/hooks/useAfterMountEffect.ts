/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';
import { useCallbackRef } from './useCallbackRef';

/**
 * A thin wrapper around “useEffect” which will only fire when the deps changes and not on mount.
 * */

const useAfterMountEffect = <TCleanUp>(callback: () => TCleanUp, deps: React.DependencyList) => {
	const hasMounted = useRef(false);

	const savedEffectCallback = useCallbackRef(callback);

	useEffect(() => {
		if (!hasMounted.current) {
			hasMounted.current = true;
			return;
		}

		savedEffectCallback();
	}, deps);
};

export { useAfterMountEffect };
