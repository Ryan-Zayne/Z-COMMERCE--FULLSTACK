import { isFunction } from "../type-helpers/typeof";

type UpdateStateFn<TObject> = (prevState: TObject) => Partial<TObject>;

type ObjectApi<in out TObject> = {
	getInitialObject: () => TObject;
	getObject: () => TObject;
	setObject: (newObject: Partial<TObject> | UpdateStateFn<TObject>, shouldReplace?: boolean) => void;
};

export type ObjectCreator<TObject> = (
	get: ObjectApi<TObject>["getObject"],
	set: ObjectApi<TObject>["setObject"],
	api: ObjectApi<TObject>
) => TObject;

const createObject = <TObject>(initializer: ObjectCreator<TObject>) => {
	let stateObject: TObject;

	const setObject: ObjectApi<TObject>["setObject"] = (newObject, shouldReplace) => {
		const updatedObject = isFunction<UpdateStateFn<TObject>>(newObject)
			? newObject(stateObject)
			: newObject;

		if (Object.is(updatedObject, stateObject)) return;

		stateObject = !shouldReplace ? { ...stateObject, ...updatedObject } : (updatedObject as TObject);
	};

	const getObject = () => stateObject;

	const getInitialObject = () => initialObject;

	const api: ObjectApi<TObject> = { getInitialObject, getObject, setObject };

	const initialObject = (stateObject = initializer(getObject, setObject, api));

	return stateObject;
};

export { createObject };
