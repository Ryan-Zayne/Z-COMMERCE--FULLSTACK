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

type AssertFn = {
	(condition: boolean, message?: string): asserts condition;
	<TValue>(value: TValue | null | undefined, message?: string): NonNullable<TValue>;
};

export const assert: AssertFn = (input: unknown, message?: string) => {
	if (input === false || input == null) {
		const prefix = "Assertion failed";

		throw new Error(message ? `${prefix}: ${message}` : prefix);
	}

	return input;
};
