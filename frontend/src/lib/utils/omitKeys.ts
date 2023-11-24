type RestOfObjectProps<
	TObject extends Record<string, unknown>,
	TOmitArray extends ReadonlyArray<keyof TObject>,
> = Omit<TObject, TOmitArray[number]>;

export const omitKeys = <
	TObject extends Record<string, unknown>,
	TOmitArray extends ReadonlyArray<keyof TObject>,
>(
	initialObject: TObject,
	keysToOmit: TOmitArray
) => {
	const filteredObjEntriesArray = Object.entries(initialObject).filter(
		([key]) => !keysToOmit.includes(key)
	);

	const updatedObject = Object.fromEntries(filteredObjEntriesArray) as RestOfObjectProps<
		TObject,
		TOmitArray
	>;

	return updatedObject;
};

export const omitKeysWithReduce = <
	TObject extends Record<string, unknown>,
	TOmitArray extends ReadonlyArray<keyof TObject>,
>(
	initialObject: TObject,
	keysToOmit: TOmitArray
) => {
	const objectEntriesArray = Object.entries(initialObject);

	const updatedObject = objectEntriesArray.reduce(
		(accumulator, [objKey, objValue]) => {
			if (!keysToOmit.includes(objKey)) {
				accumulator[objKey] = objValue;
			}

			return accumulator;
		},
		{} as Record<string, unknown>
	);

	return updatedObject as RestOfObjectProps<TObject, TOmitArray>;
};

export const omitKeysWithLoop = <
	TObject extends Record<string, unknown>,
	TOmitArray extends ReadonlyArray<keyof TObject>,
>(
	initialObject: TObject,
	keysToOmit: TOmitArray
) => {
	const updatedObject: Record<string, unknown> = {};

	/* eslint-disable no-continue */
	for (const [key, value] of Object.entries(initialObject)) {
		if (keysToOmit.includes(key)) continue;

		updatedObject[key] = value;
	}

	return updatedObject as RestOfObjectProps<TObject, TOmitArray>;
};
