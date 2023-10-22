/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';
import { useCallbackRef } from './useCallbackRef';

/**
 * A thin wrapper around “useEffect” which will fire when the deps changes and not on mount.
 * */

const useAfterMountEffect = (callback: React.EffectCallback, deps: React.DependencyList = []) => {
	const hasMounted = useRef(false);

	const savedEffectCallback = useCallbackRef(callback);

	useEffect(() => {
		if (!hasMounted.current) {
			hasMounted.current = true;
			return;
		}

		const cleanupFn = savedEffectCallback();

		return cleanupFn;
	}, deps);
};

export { useAfterMountEffect };
