export type WithChildren<TProps> = TProps & {
	children: React.ReactNode;
};

export type WithChildrenOptional<TProps> = TProps & {
	children?: React.ReactNode;
};

export const assertDefined = <T>(value: T) => {
	if (value == null) {
		throw new Error(`The Value "${value}" is not defined`);
	}

	return value;
};

export const assertRef = <T>(value: T) => value as NonNullable<T>;
