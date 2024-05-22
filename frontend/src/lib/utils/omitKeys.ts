export const omitKeys = <
	TObject extends Record<string, unknown>,
	const TOmitArray extends Array<keyof TObject>,
>(
	initialObject: TObject,
	keysToOmit: TOmitArray
) => {
	const arrayFromFilteredObject = Object.entries(initialObject).filter(
		([key]) => !keysToOmit.includes(key)
	);

	const updatedObject = Object.fromEntries(arrayFromFilteredObject);

	return updatedObject as Omit<TObject, keyof TOmitArray>;
};

export const omitKeysWithReduce = <
	TObject extends Record<string, unknown>,
	const TOmitArray extends Array<keyof TObject>,
>(
	initialObject: TObject,
	keysToOmit: TOmitArray
) => {
	const arrayFromObject = Object.entries(initialObject);

	const updatedObject = arrayFromObject.reduce<Record<string, unknown>>((accumulator, [key, value]) => {
		if (!keysToOmit.includes(key)) {
			accumulator[key] = value;
		}

		return accumulator;
	}, {});

	return updatedObject as Omit<TObject, keyof TOmitArray>;
};

export const omitKeysWithLoop = <
	TObject extends Record<string, unknown>,
	const TOmitArray extends Array<keyof TObject>,
>(
	initialObject: TObject,
	keysToOmit: TOmitArray
) => {
	const keysToOmitSet = new Set(keysToOmit);

	const updatedObject: Record<string, unknown> = {};

	for (const [key, value] of Object.entries(initialObject)) {
		!keysToOmitSet.has(key) && (updatedObject[key] = value);
	}

	return updatedObject as Omit<TObject, keyof TOmitArray>;
};
