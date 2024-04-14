import { isFunction, isObject } from "../type-helpers/typeof";

type NewStateFn<TState> = (prevState: TState) => Partial<TState>;

type Listener<TState> = (state: TState, prevState: TState) => void;

type StoreApi<TState> = {
	getState: () => TState;
	getInitialState: () => TState;
	setState: (newValue: Partial<TState> | NewStateFn<TState>, shouldReplace?: boolean) => void;
	subscribe: (listener: Listener<TState>) => () => void;
};

export type StateCreator<TState = ""> = (
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

		listeners.size > 0 && listeners.forEach((onStoreChange) => onStoreChange(state, previousState));
	};

	const getState = () => state;

	const getInitialState = () => initialState;

	const subscribe: StoreApi<TState>["subscribe"] = (onStoreChange) => {
		listeners.add(onStoreChange);

		return () => listeners.delete(onStoreChange);
	};

	const api: StoreApi<TState> = { getState, getInitialState, setState, subscribe };

	// eslint-disable-next-line no-multi-assign
	const initialState = (state = initializer(getState, setState, api));

	return api;
};

export { createStore };
