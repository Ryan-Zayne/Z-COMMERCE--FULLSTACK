import { useLocation } from "./useLocation";

function useSearchParams<TSearchParams extends Record<string, string>>() {
	const [search, , replaceSearch] = useLocation((state) => state.search);

	const getParams = () => {
		const searchParams = new URLSearchParams(search);
		const searchParamObject = Object.fromEntries(searchParams.entries());

		return searchParamObject as TSearchParams;
	};

	const setParams = (queryParams: TSearchParams) => {
		const searchParams = new URLSearchParams(queryParams);

		replaceSearch(`?${searchParams.toString()}`);
	};

	return [getParams, setParams] as const;
}

export { useSearchParams };
