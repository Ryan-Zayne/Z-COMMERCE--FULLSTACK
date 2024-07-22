// == The intersection with "{}" or "unknown" or "NonNullable<unknown>" is necessary to make it work as expected based on quirks in the TS compiler
export type Prettify<TObject> = { [Key in keyof TObject]: TObject[Key] } & NonNullable<unknown>;

export type CallbackFn<TParams, TResult = void> = (...params: TParams[]) => TResult;

export type Writeable<T> = Prettify<{ -readonly [P in keyof T]: T[P] }>;

/* eslint-disable @typescript-eslint/no-explicit-any */
// == `Any` is required here so that one can pass custom function type without type errors
export type AnyFunction = (...args: any[]) => any;
