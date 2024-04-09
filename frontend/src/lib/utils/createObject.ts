import { isFunction } from "../type-helpers/typeof";

type NewStateFn<TObject> = (prevState: TObject) => Partial<TObject>;

type ObjectApi<TObject> = {
	getObject: () => TObject;
	getInitialObject: () => TObject;
	setObject: (updatedObject: Partial<TObject> | NewStateFn<TObject>, shouldReplace?: boolean) => void;
};

export type ObjectCreator<TObject> = (
	get: ObjectApi<TObject>["getObject"],
	set: ObjectApi<TObject>["setObject"],
	api: ObjectApi<TObject>
) => TObject;

const createObject = <TObject>(objectCreator: ObjectCreator<TObject>) => {
	let stateObject = {} as TObject;

	const setObject: ObjectApi<TObject>["setObject"] = (updatedObject, shouldReplace) => {
		const resolvedObject = isFunction<NewStateFn<TObject>>(updatedObject)
			? updatedObject(stateObject)
			: updatedObject;

		if (Object.is(resolvedObject, stateObject)) return;

		stateObject = shouldReplace ? (resolvedObject as TObject) : { ...stateObject, ...resolvedObject };
	};

	const getObject = () => stateObject;

	// eslint-disable-next-line @typescript-eslint/no-use-before-define
	const getInitialObject: ObjectApi<TObject>["getInitialObject"] = () => initialObject;

	const api: ObjectApi<TObject> = { getObject, getInitialObject, setObject };

	const initialObject = objectCreator(getObject, setObject, api);

	return stateObject;
};

export { createObject };
