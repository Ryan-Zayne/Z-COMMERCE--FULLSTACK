import { isBrowser } from './constants.ts';

const parseJSON = <TResult>(value: ReturnType<typeof localStorage.getItem>) => {
	if (!isBrowser || value == null) {
		return null;
	}

	return JSON.parse(value) as TResult;
};

export { parseJSON };
