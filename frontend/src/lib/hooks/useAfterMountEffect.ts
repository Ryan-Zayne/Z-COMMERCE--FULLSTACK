/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';
import { useCallbackRef } from './useCallbackRef.ts';

/**
 * A thin wrapper around “useEffect” which will fire when the deps changes or when the component unmounts, but not on mount.
 * */

const useAfterMountEffect = (callback: React.EffectCallback, deps: React.DependencyList = []) => {
	const hasMounted = useRef(false);

	const savedEffectCallback = useCallbackRef(callback);

	useEffect(function afterMountEffect() {
		if (!hasMounted.current) {
			hasMounted.current = true;
			return;
		}

		const cleanUpFn = savedEffectCallback();

		return cleanUpFn;
	}, deps);
};

export { useAfterMountEffect };
