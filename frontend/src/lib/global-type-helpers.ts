export type WithChildren<TProps> = TProps & {
	children: React.ReactNode;
};

export type WithChildrenOptional<TProps> = TProps & {
	children?: React.ReactNode;
};

export type Setter<TSetter = undefined> = React.Dispatch<React.SetStateAction<TSetter>>;

export type Prettify<T> = {
	[k in keyof T]: T[k];
};

export const assertDefined = <T>(value: T) => {
	if (value == null) {
		throw new Error(`The Value "${value}" is not defined`);
	}

	return value;
};

export const assertRef = <T>(value: T) => value as NonNullable<T>;

// prettier-ignore
export const isObject = <T extends Record<string, unknown>>(obj: T): obj is T => typeof obj === 'object' && obj !== null && !Array.isArray(obj);
