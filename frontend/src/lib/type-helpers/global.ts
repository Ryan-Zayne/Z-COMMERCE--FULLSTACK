export type ForwardedRefType<TComponent extends React.ElementType | HTMLElement> =
	TComponent extends React.ElementType
		? React.ForwardedRef<React.ElementRef<TComponent>>
		: React.ForwardedRef<TComponent>;

export type InferProps<TComponent extends React.ElementType | HTMLElement> =
	TComponent extends React.ElementType
		? React.ComponentPropsWithoutRef<TComponent>
		: React.HTMLAttributes<TComponent>;

export type StateSetter<TSetter = unknown> = React.Dispatch<React.SetStateAction<TSetter>>;

// == The intersection with "{}" or "unknown" or "NonNullable<unknown>" is necessary to make it work as expected based on quirks in the TS compiler
export type Prettify<TObject> = { [Key in keyof TObject]: TObject[Key] } & NonNullable<unknown>;

export type PrettyOmit<TObject, K extends keyof TObject> = Prettify<Omit<TObject, K>>;

export type CallbackFn<TParams, TResult = void> = (...params: TParams[]) => TResult;

export type SelectorFn<TStore, TResult> = (state: TStore) => TResult;

export type Writeable<TObject> = { -readonly [Key in keyof TObject]: TObject[Key] };

export type MyCustomCss = React.CSSProperties & Record<`--${string}`, string>; // Allows Ts support for inline css variables

/* eslint-disable @typescript-eslint/no-explicit-any */
// == `Any` is required here so that one can pass custom function type without type errors
export type AnyFunction = (...args: any[]) => any;
export type AnyAsyncFunction = (...args: any[]) => Promise<any>;
