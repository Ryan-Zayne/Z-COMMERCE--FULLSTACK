import { useLocation } from "./useLocation";

function useSearchParams<TSearchParams extends Record<string, string>>() {
	const [search, { replace }] = useLocation((state) => state.search);

	const getParams = () => {
		const searchParams = new URLSearchParams(search);
		const searchParamObject = Object.fromEntries(searchParams.entries());

		return searchParamObject as TSearchParams;
	};

	const setParams = (queryParams: TSearchParams) => {
		const searchParams = new URLSearchParams(queryParams);

		replace(`?${searchParams.toString()}`);
	};

	return [getParams, setParams] as const;
}

export { useSearchParams };
