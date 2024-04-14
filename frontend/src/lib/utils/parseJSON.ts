/* eslint-disable unicorn/filename-case */

type ParseJSON = {
	<TResult>(value: string): TResult;
	<TResult>(value: string | undefined | null): TResult | null;
};

// Implementation
const parseJSON: ParseJSON = <TResult>(value: unknown) => {
	if (typeof value !== "string") {
		return null;
	}

	return JSON.parse(value) as TResult;
};

export { parseJSON };
