import { isFunction, isObject } from "../type-helpers/typeof";

// == Using Immediately Indexed Mapped Type instead the direct type so that the full signature would be unveiled to the consumer on hover as opposed to the just the vague type name
export type NewStateFn<TState> = { _: (prevState: TState) => Partial<TState> }["_"];

type SetState<TState> = {
	_: (newState: Partial<TState> | NewStateFn<TState>, shouldReplace?: boolean) => void;
}["_"];

type Listener<TState> = { _: (state: TState, prevState: TState) => void }["_"];

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface StoreApi<TState> {
	getState: () => TState;
	getInitialState: () => TState;
	setState: SetState<TState>;
	subscribe: (listener: Listener<TState>) => () => void;
}

export type StateCreator<TState> = (
	get: StoreApi<TState>["getState"],
	set: StoreApi<TState>["setState"],
	api: StoreApi<TState>
) => TState;

const createStore = <TState>(initializer: StateCreator<TState>) => {
	let state: TState;

	const listeners = new Set<Listener<TState>>();

	const setState: StoreApi<TState>["setState"] = (newState, shouldReplace) => {
		const nextState = isFunction<NewStateFn<TState>>(newState) ? newState(state) : newState;

		if (Object.is(nextState, state)) return;

		const previousState = state;

		state =
			!shouldReplace && isObject(state) && isObject(nextState)
				? { ...state, ...nextState }
				: (nextState as TState);

		listeners.forEach((onStoreChange) => onStoreChange(state, previousState));
	};

	const getState = () => state;

	const getInitialState = () => initialState;

	const subscribe: StoreApi<TState>["subscribe"] = (onStoreChange) => {
		listeners.add(onStoreChange);

		return () => listeners.delete(onStoreChange);
	};

	const api: StoreApi<TState> = { getState, getInitialState, setState, subscribe };

	const initialState = (state = initializer(getState, setState, api));

	return api;
};

export { createStore };
