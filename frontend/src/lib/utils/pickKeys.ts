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
	const keysToPickSet = new Set(keysToPick);

	const arrayFromInitObject = Object.entries(initialObject);

	const filteredArray = arrayFromInitObject.filter(([objectKey]) => keysToPickSet.has(objectKey));

	const updatedObject = Object.fromEntries(filteredArray);

	return updatedObject as Pick<TObject, TPickArray[number]>;
};

export { pickKeys };
