export const isString = (value: unknown): value is string => typeof value === "string";

export const isArray = <TArray>(value: unknown): value is TArray[] => Array.isArray(value);

export const isFormData = (value: unknown): value is FormData => value instanceof FormData;

export const isObject = <TObject extends Record<string, unknown>>(value: unknown): value is TObject => {
	return typeof value === "object" && value !== null && !isFormData(value) && !isArray(value);
};

// == `Any` is required here so that one can pass custom function type without type errors
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isFunction = <TFunction extends (...args: any) => any>(
	value: unknown
): value is TFunction => {
	return typeof value === "function";
};
