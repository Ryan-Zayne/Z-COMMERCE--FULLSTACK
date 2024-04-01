import type { Prettify, Writeable } from "../type-helpers/global-type-helpers";

type PrettifyPickResult<
	TObject extends Record<string, unknown>,
	TOmitArray extends Array<keyof TObject>,
> = Prettify<Writeable<Pick<TObject, TOmitArray[number]>>>;

/**
 * Generates a new object by picking specified keys from an initial object.
 *
 * @param  initialObject - The initial object from which keys will be picked.
 * @param  keysToPick - The array of keys to be picked from the initial object.
 * @returns - The updated object containing only the picked keys.
 */
const pickKeys = <TObject extends Record<string, unknown>, const TPickArray extends Array<keyof TObject>>(
	initialObject: TObject,
	keysToPick: TPickArray
) => {
	const arrayFromInitObject = Object.entries(initialObject);

	const filteredArray = arrayFromInitObject.filter(([objectKey]) => keysToPick.includes(objectKey));

	const updatedObject = Object.fromEntries(filteredArray);

	return updatedObject as PrettifyPickResult<TObject, TPickArray>;
};

export { pickKeys };
