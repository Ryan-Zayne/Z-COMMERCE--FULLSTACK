export type WithChildren<TProps> = TProps & {
	children: React.ReactNode;
};

export type WithChildrenOptional<TProps> = Partial<WithChildren<TProps>>;

export type ForwardedRefType<TComponent extends React.ElementType | HTMLElement> =
	TComponent extends React.ElementType
		? React.ForwardedRef<React.ElementRef<TComponent>>
		: React.ForwardedRef<TComponent>;

export type StateSetter<TSetter = unknown> = React.Dispatch<React.SetStateAction<TSetter>>;

// == The intersection with "{}" or "unknown" or "NonNullable<unknown>" is necessary to make it work as expected due to quirks in the TS compiler
export type Prettify<TObject> = { [Key in keyof TObject]: TObject[Key] } & NonNullable<unknown>;

export type PrettyOmit<TObject, K extends keyof TObject> = Prettify<Omit<TObject, K>>;

export type CallbackFn<TParams, TResult = void> = (...params: TParams[]) => TResult;

export type SelectorFn<TStore, TResult> = (state: TStore) => TResult;

export type Writeable<TObject> = { -readonly [Key in keyof TObject]: TObject[Key] };

export type MyCustomCss = React.CSSProperties & Record<`--${string}`, string>; // Allows Ts support for inline css variables
