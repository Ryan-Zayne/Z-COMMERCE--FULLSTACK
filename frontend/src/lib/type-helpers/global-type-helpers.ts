export type WithChildren<TProps> = TProps & {
	children: React.ReactNode;
};

export type WithChildrenOptional<TProps> = Partial<WithChildren<TProps>>;

export type StateSetter<TSetter = unknown> = React.Dispatch<React.SetStateAction<TSetter>>;

export type Prettify<T> = { [k in keyof T]: T[k] };

export const assertDefined = <T>(value: T) => {
	if (value == null) {
		throw new Error(`The value passed is not defined!`);
	}

	return value;
};

export const assertRef = <T>(value: T) => value as NonNullable<T>;
