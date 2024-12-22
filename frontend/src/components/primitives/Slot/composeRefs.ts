import { isFunction } from "@zayne-labs/toolkit/type-helpers";

export type PossibleRef<TRef> = React.Ref<TRef> | undefined;

/**
 * @description Set a given ref to a given value.
 *
 * This utility takes care of different types of refs: callback refs and RefObject(s)
 */
const setRef = <TRef>(ref: PossibleRef<TRef>, value: TRef) => {
	if (!ref) return;

	if (isFunction(ref)) {
		return ref(value);
	}

	// eslint-disable-next-line no-param-reassign
	ref.current = value;
};

/**
 * @description A utility to compose refs together.
 *
 * Accepts callback refs and RefObject(s)
 */
const composeRefs = <TRef>(refs: Array<PossibleRef<TRef>>) => {
	const refCallBack = (node: TRef) => {
		const cleanupFnArray = refs.map((ref) => setRef(ref, node)).filter(Boolean);

		if (cleanupFnArray.length === 0) return;

		return () => cleanupFnArray.forEach((cleanup) => cleanup?.());
	};

	return refCallBack;
};

export { composeRefs };
