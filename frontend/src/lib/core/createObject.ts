import { isFunction } from "../type-helpers/typeof";

type NewStateFn<TObject> = (prevState: TObject) => Partial<TObject>;

type ObjectApi<TObject> = {
	getObject: () => TObject;
	getInitialObject: () => TObject;
	setObject: (newObject: Partial<TObject> | NewStateFn<TObject>, shouldReplace?: boolean) => void;
};

export type ObjectCreator<TObject> = (
	get: ObjectApi<TObject>["getObject"],
	set: ObjectApi<TObject>["setObject"],
	api: ObjectApi<TObject>
) => TObject;

const createObject = <TObject>(initializer: ObjectCreator<TObject>) => {
	let stateObject = {} as TObject;

	const setObject: ObjectApi<TObject>["setObject"] = (newObject, shouldReplace) => {
		const updatedObject = isFunction<NewStateFn<TObject>>(newObject)
			? newObject(stateObject)
			: newObject;

		if (Object.is(updatedObject, stateObject)) return;

		stateObject = shouldReplace ? (updatedObject as TObject) : { ...stateObject, ...updatedObject };
	};

	const getObject = () => stateObject;

	const getInitialObject = () => initialObject;

	const api: ObjectApi<TObject> = { getObject, getInitialObject, setObject };

	// eslint-disable-next-line no-multi-assign
	const initialObject = (stateObject = initializer(getObject, setObject, api));

	return stateObject;
};

export { createObject };
