/* eslint-disable unicorn/filename-case */

function parseJSON<TResult>(value: string): TResult;
function parseJSON<TResult>(value: string | undefined | null): TResult | null;

// Implementation
function parseJSON<TResult>(value: unknown) {
	if (typeof value !== "string") {
		return null;
	}

	return JSON.parse(value) as TResult;
}

export { parseJSON };
