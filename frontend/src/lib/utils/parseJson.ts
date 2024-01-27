/* eslint-disable unicorn/filename-case */
import { isBrowser } from "./constants";

const parseJSON = <TResult>(value: string | undefined | null) => {
	if (!isBrowser || value == null) {
		return null;
	}

	return JSON.parse(value) as TResult;
};

export { parseJSON };
