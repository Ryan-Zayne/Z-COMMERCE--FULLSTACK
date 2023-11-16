type RestOfObjectProps<
	TObject extends Record<string, unknown>,
	TOmitArray extends ReadonlyArray<keyof TObject>,
> = Omit<TObject, TOmitArray[number]>;

export const omitProps = <
	TObject extends Record<string, unknown>,
	TOmitArray extends ReadonlyArray<keyof TObject>,
>(
	initialObject: TObject,
	keysToOmit: TOmitArray
) => {
	// prettier-ignore
	const filteredObjEntriesArray = Object.entries(initialObject).filter(([key]) => !keysToOmit.includes(key));

	const updatedObject = Object.fromEntries(filteredObjEntriesArray);

	return updatedObject as RestOfObjectProps<TObject, TOmitArray>;
};

export const omitPropsWithReduce = <
	TObject extends Record<string, unknown>,
	TOmitArray extends ReadonlyArray<keyof TObject>,
>(
	initialObject: TObject,
	keysToOmit: TOmitArray
) => {
	const objectEntriesArray = Object.entries(initialObject);

	// prettier-ignore
	const unpdatedObject = objectEntriesArray.reduce((accumulator, [objKey, objValue]) => {
			if (keysToOmit.includes(objKey)) {
				return accumulator;
			}

			return { ...accumulator, [objKey]: objValue };
		},
		{} as RestOfObjectProps<TObject, TOmitArray>
	);

	return unpdatedObject;
};

export const omitPropsWithLoop = <
	TObject extends Record<string, unknown>,
	TOmitArray extends ReadonlyArray<keyof TObject>,
>(
	initialObject: TObject,
	keysToOmit: TOmitArray
) => {
	const unpdatedObject: Record<string, unknown> = {};

	/* eslint-disable no-continue */
	for (const [key, value] of Object.entries(initialObject)) {
		if (keysToOmit.includes(key)) continue;

		unpdatedObject[key] = value;
	}

	return unpdatedObject as RestOfObjectProps<TObject, TOmitArray>;
};
