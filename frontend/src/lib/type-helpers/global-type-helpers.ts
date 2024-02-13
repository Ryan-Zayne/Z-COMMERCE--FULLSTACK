export type WithChildren<TProps> = TProps & {
	children: React.ReactNode;
};

export type WithChildrenOptional<TProps> = Partial<WithChildren<TProps>>;

export type StateSetter<TSetter = unknown> = React.Dispatch<React.SetStateAction<TSetter>>;

export type Prettify<T> = { [k in keyof T]: T[k] };

export type CallbackFn<TParams, TResult = void> = (...params: TParams[]) => TResult;

export type MyCustomCss = React.CSSProperties & Record<`--${string}`, string>; // Allows Ts support for inline css variables

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
