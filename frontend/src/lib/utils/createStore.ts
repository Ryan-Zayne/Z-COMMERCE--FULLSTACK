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

const createStore = <TState>(stateCreatorFn: StateCreator<TState>) => {
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

		listeners.size > 0 && listeners.forEach((listener) => listener(state, previousState));
	};

	const getState: StoreApi<TState>["getState"] = () => state;

	// eslint-disable-next-line @typescript-eslint/no-use-before-define
	const getInitialState: StoreApi<TState>["getInitialState"] = () => initialState;

	const subscribe: StoreApi<TState>["subscribe"] = (listener) => {
		listeners.add(listener);

		return () => listeners.delete(listener);
	};

	const api: StoreApi<TState> = { getState, getInitialState, setState, subscribe };

	const initialState = stateCreatorFn(getState, setState, api);

	return api;
};

export { createStore };
