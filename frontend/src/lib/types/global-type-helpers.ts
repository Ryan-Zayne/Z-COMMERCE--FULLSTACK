export type WithChildren<TProps> = TProps & {
	children: React.ReactNode;
};

export type WithChildrenOptional<TProps> = TProps & {
	children?: React.ReactNode;
};

export type StateSetter<TSetter = undefined> = React.Dispatch<React.SetStateAction<TSetter>>;

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

export const isObject = <TObject extends Record<string, unknown>>(obj: TObject): obj is TObject => {
	return typeof obj === 'object' && obj !== null && !Array.isArray(obj);
};
