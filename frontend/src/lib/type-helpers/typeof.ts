export const isString = (value: unknown) => typeof value === "string";

export const isArray = <TArray>(value: unknown): value is TArray[] => Array.isArray(value);

export const isFormData = (value: unknown) => value instanceof FormData;

export const isObject = <TObject extends Record<string, unknown>>(value: unknown): value is TObject => {
	return (
		typeof value === "object" && value !== null && !(value instanceof FormData) && !Array.isArray(value)
	);
};

// == `Any` is required here so that one can pass custom function type without type errors
/* eslint-disable @typescript-eslint/no-explicit-any */
export const isFunction = <TFunction extends (...args: any[]) => any>(
	value: unknown
): value is TFunction => {
	return typeof value === "function";
};

export const isAsyncFunction = <TAsyncFunction extends (...args: any[]) => Promise<any>>(
	value: unknown
): value is TAsyncFunction => {
	return isFunction(value) && value.constructor.name === "AsyncFunction";
};
