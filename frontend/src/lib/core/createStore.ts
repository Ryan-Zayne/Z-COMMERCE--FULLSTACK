import type { Prettify } from "@/lib/type-helpers";
import { isFunction } from "../type-helpers/typeof";

// == Using Immediately Indexed Mapped Type instead the direct type so that the full signature would be unveiled to the consumer on hover as opposed to the just the vague type name
export type UpdateStateFn<TState> = { _: (prevState: TState) => Partial<TState> }["_"];

type SetState<TState> = {
	_: (newState: Partial<TState> | UpdateStateFn<TState>, shouldReplace?: boolean) => void;
}["_"];

type Listener<TState> = { _: (state: TState, prevState: TState) => void }["_"];

type SelectorFn<in TStore, out TResult> = { _: (state: TStore) => TResult }["_"];

type SubscribeOptions<TState> = {
	equalityFn?: (nextState: Partial<TState>, previousState: TState) => boolean;
	fireListenerImmediately?: boolean;
};

export type StoreApi<in out TState, TSlice = TState> = {
	getInitialState: () => TState;
	getState: () => TState;
	setState: SetState<TState>;
	subscribe: {
		(onStoreChange: Listener<TState>): () => void;

		withSelector: (
			selector: SelectorFn<TState, TSlice>,
			onStoreChange: Listener<TState>,
			options?: SubscribeOptions<TState>
		) => () => void;
	};
};

export type StateInitializer<TState, TSlice = TState> = (
	get: StoreApi<TState, TSlice>["getState"],
	set: StoreApi<TState, TSlice>["setState"],
	api: StoreApi<TState, TSlice>
) => TState;

type StoreOptions<TState> = Prettify<Pick<SubscribeOptions<TState>, "equalityFn">>;

const createStore = <TState, TSlice = TState>(
	initializer: StateInitializer<TState, TSlice>,
	options: StoreOptions<TState> = {}
) => {
	let state: TState;

	const listeners = new Set<Listener<TState>>();

	const getState = () => state;

	const getInitialState = () => initialState;

	type $StoreApi = StoreApi<TState, TSlice>;

	const { equalityFn = Object.is } = options;

	const setState: $StoreApi["setState"] = (newState, shouldReplace) => {
		const nextState = isFunction<UpdateStateFn<TState>>(newState) ? newState(state) : newState;

		if (equalityFn(nextState, state)) return;

		const previousState = state;

		state = !shouldReplace ? { ...state, ...nextState } : (nextState as TState);

		listeners.forEach((onStoreChange) => onStoreChange(state, previousState));
	};

	const subscribe: $StoreApi["subscribe"] = (onStoreChange) => {
		listeners.add(onStoreChange);

		return () => listeners.delete(onStoreChange);
	};

	subscribe.withSelector = (selector, onStoreChange, subscribeOptions = {}) => {
		const { equalityFn: $equalityFn = equalityFn, fireListenerImmediately = false } = subscribeOptions;

		let slice = selector(getState());

		if (fireListenerImmediately) {
			onStoreChange(slice as never, slice as never);
		}

		const modifiedOnStoreChange = ($state: TState) => {
			const nextSlice = selector($state);

			if ($equalityFn(slice as never, nextSlice as never)) return;

			const previousSlice = slice;

			slice = nextSlice;

			onStoreChange(slice as never, previousSlice as never);
		};

		return subscribe(modifiedOnStoreChange);
	};

	const api: $StoreApi = { getInitialState, getState, setState, subscribe };

	const initialState = (state = initializer(getState, setState, api));

	return api;
};

export { createStore };
