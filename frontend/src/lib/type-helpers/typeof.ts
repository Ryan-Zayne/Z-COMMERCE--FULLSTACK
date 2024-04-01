export const isString = (value: unknown): value is string => typeof value === "string";

export const isArray = (value: unknown): value is unknown[] => Array.isArray(value);

export const isFormData = (value: unknown): value is FormData => value instanceof FormData;

export const isObject = <TObject extends Record<string, unknown>>(value: unknown): value is TObject => {
	return typeof value === "object" && value !== null && !isFormData(value) && !isArray(value);
};
