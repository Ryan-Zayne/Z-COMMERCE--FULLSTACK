export const omitKeys = <
	const TObject extends Record<string, unknown>,
	const TOmitArray extends Array<keyof TObject>,
>(
	initialObject: TObject,
	keysToOmit: TOmitArray
) => {
	const arrayFromFilteredObject = Object.entries(initialObject).filter(
		([key]) => !keysToOmit.includes(key)
	);

	const updatedObject = Object.fromEntries(arrayFromFilteredObject);

	return updatedObject as {
		[Key in Exclude<keyof TObject, TOmitArray[number]>]: TObject[Key];
	};
};

export const omitKeysWithReduce = <
	const TObject extends Record<string, unknown>,
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

	return updatedObject as {
		[Key in Exclude<keyof TObject, TOmitArray[number]>]: TObject[Key];
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
		!keysToOmit.includes(key) && (updatedObject[key] = value);
	}

	return updatedObject as {
		[Key in Exclude<keyof TObject, TOmitArray[number]>]: TObject[Key];
	};
};
