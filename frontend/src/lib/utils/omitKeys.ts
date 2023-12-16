export const omitKeys = <
	const TObject extends Record<string, unknown>,
	const TOmitArray extends Array<keyof TObject>,
>(
	initialObject: TObject,
	keysToOmit: TOmitArray
) => {
	const filteredObjEntriesArray = Object.entries(initialObject).filter(
		([key]) => !keysToOmit.includes(key)
	);

	const updatedObject = Object.fromEntries(filteredObjEntriesArray);

	return updatedObject as {
		[K in Exclude<keyof TObject, TOmitArray[number]>]: TObject[K];
	};
};

export const omitKeysWithReduce = <
	const TObject extends Record<string, unknown>,
	const TOmitArray extends Array<keyof TObject>,
>(
	initialObject: TObject,
	keysToOmit: TOmitArray
) => {
	const objectEntriesArray = Object.entries(initialObject);

	const updatedObject = objectEntriesArray.reduce<Record<string, unknown>>(
		(accumulator, [key, value]) => {
			if (!keysToOmit.includes(key)) {
				accumulator[key] = value;
			}

			return accumulator;
		},
		{}
	);

	return updatedObject as {
		[K in Exclude<keyof TObject, TOmitArray[number]>]: TObject[K];
	};
};

export const omitKeysWithLoop = <
	const TObject extends Record<string, unknown>,
	const TOmitArray extends Array<keyof TObject>,
>(
	initialObject: TObject,
	keysToOmit: TOmitArray
) => {
	const updatedObject: Record<string, unknown> = {};

	for (const [key, value] of Object.entries(initialObject)) {
		if (!keysToOmit.includes(key)) {
			updatedObject[key] = value;
		}
	}

	return updatedObject as {
		[K in Exclude<keyof TObject, TOmitArray[number]>]: TObject[K];
	};
};
