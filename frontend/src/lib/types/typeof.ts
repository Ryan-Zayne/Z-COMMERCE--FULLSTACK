export const isObject = (value: unknown): value is Record<string, unknown> => {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
};

export const isArray = (value: unknown): value is unknown[] => Array.isArray(value);
