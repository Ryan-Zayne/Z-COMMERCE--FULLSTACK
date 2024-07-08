// == The intersection with "{}" or "unknown" or "NonNullable<unknown>" is necessary to make it work as expected based on quirks in the TS compiler
export type Prettify<TObject> = { [Key in keyof TObject]: TObject[Key] } & NonNullable<unknown>;

export type CallbackFn<TParams, TResult = void> = (...params: TParams[]) => TResult;
