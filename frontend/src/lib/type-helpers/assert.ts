export const assertDefined = <T>(value: T) => {
	if (value == null) {
		throw new Error(`The value passed is not defined!`);
	}

	return value;
};

export const assertENV = (variable: string | undefined, options?: { message: string }) => {
	const { message = "Required Environment variable is missing or undefined" } = options ?? {};

	if (variable === undefined) {
		throw new Error(message);
	}

	return variable;
};

export const assertRef = <T>(value: T) => value as NonNullable<T>;
