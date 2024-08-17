import { isArray, isFunction, isObject } from "../type-helpers";
import { useLocation } from "./useLocation";

type KeyValuePair = [string, string];

export type URLSearchParamsInit =
	| string
	| KeyValuePair[]
	| Record<string, string | string[]>
	| URLSearchParams;

export const createSearchParams = (paramsInit: URLSearchParamsInit = ""): URLSearchParams => {
	if (!isObject(paramsInit)) {
		return new URLSearchParams(paramsInit);
	}

	const arrayOfKeyValuePairs: KeyValuePair[] = [];

	for (const [key, value] of Object.entries(paramsInit)) {
		if (isArray(value)) {
			arrayOfKeyValuePairs.push(...(value.map((v) => [key, v]) as KeyValuePair[]));

			continue;
		}

		arrayOfKeyValuePairs.push([key, value] as KeyValuePair);
	}

	return new URLSearchParams(arrayOfKeyValuePairs);
};

const useSearchParams = <TSearchParams extends URLSearchParamsInit>(
	action: "push" | "replace" = "push"
) => {
	const [search, setSearch] = useLocation((state) => state.search);

	const searchParams = new URLSearchParams(search);

	type QueryParams = { _: TSearchParams | ((prev: TSearchParams) => TSearchParams) }["_"];

	const setSearchParams = (queryParams: QueryParams) => {
		const nextSearchParams = isFunction(queryParams)
			? queryParams(searchParams as TSearchParams)
			: queryParams;

		const params = createSearchParams(nextSearchParams);

		setSearch[action](`?${params.toString()}`);
	};

	return [searchParams, setSearchParams] as const;
};

export { useSearchParams };
